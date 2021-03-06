var assert = require('assert')
var microtime = require('microtime-nodejs')
var uuid = require('uuid/v4')

function RateLimiter (options) {
  const redis = options.redis
  const interval = options.interval * 1000 // in microseconds
  const maxInInterval = options.maxInInterval
  const minDifference = options.minDifference ? 1000 * options.minDifference : null // also in microseconds
  const namespace = options.namespace || (options.redis && (`rate-limiter-${Math.random().toString(36).slice(2)}`)) || null

  assert(interval > 0, 'Must pass a positive integer for `options.interval`')
  assert(maxInInterval > 0, 'Must pass a positive integer for `options.maxInInterval`')
  assert(!(minDifference < 0), '`options.minDifference` cannot be negative')

  if (!options.redis) {
    var storage = {}
    var timeouts = {}
  }

  if (redis) {
    // If redis is going to be potentially returning buffers OR an array from
    // ZRANGE, need a way to safely convert either of these types to an array
    // of numbers.  Otherwise, we can just assume that the result is an array
    // and safely map over it.
    var zrangeToUserSet
    if (redis.options.return_buffers || redis.options.detect_buffers) {
      zrangeToUserSet = function (str) {
        return String(str).split(',').map(Number)
      }
    } else {
      zrangeToUserSet = function (arr) {
        return arr.map(Number)
      }
    }

    return function (id, cb) {
      if (!cb) {
        cb = id
        id = ''
      }

      assert.equal(typeof cb, 'function', 'Callback must be a function.')

      var now = microtime.now()
      var key = namespace + id
      var clearBefore = now - interval

      var batch = redis.multi()
      batch.zremrangebyscore(key, 0, clearBefore)
      batch.zrange(key, 0, -1, 'withscores')
      batch.zadd(key, now, uuid())
      batch.expire(key, Math.ceil(interval / 1000000)) // convert to seconds, as used by redis ttl.
      batch.exec(function (err, resultArr) {
        if (err) return cb(err)

        var userSet = zrangeToUserSet(resultArr[1]).filter(function (elem, i) {
          return i % 2 != 0
        })

        var tooManyInInterval = userSet.length >= maxInInterval
        var timeSinceLastRequest = now - userSet[userSet.length - 1]

        var result
        var remaining = maxInInterval - userSet.length - 1

        if (tooManyInInterval || timeSinceLastRequest < minDifference) {
          result = Math.max(tooManyInInterval ? userSet[userSet.length - maxInInterval] - now + interval : 0, minDifference || 0)
          result = Math.floor(result / 1000) // convert to miliseconds for user readability.
        } else {
          result = 0
        }

        return cb(null, result, remaining)
      })
    }
  }
}

module.exports = RateLimiter
