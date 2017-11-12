'use strict'

import isObject from './isObject'

export default function omit (obj, props, fn) {
  if (!isObject(obj)) return {}

  if (typeof props === 'function') {
    fn = props
    props = []
  }

  if (typeof props === 'string') {
    props = [props]
  }

  var isFunction = typeof fn === 'function'
  var keys = Object.keys(obj)
  var res = {}

  for (var i = 0; i < keys.length; i++) {
    var key = keys[i]
    var val = obj[key]

    if (!props || (props.indexOf(key) === -1 && (!isFunction || fn(val, key, obj)))) {
      res[key] = val
    }
  }
  return res
}
