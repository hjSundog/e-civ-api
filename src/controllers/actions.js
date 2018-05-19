const omit = require('../lib/omit')
const Person = require('../models/person')
const translator = require('../tpl/translator')
const authInterceptor = require('../tool/Auth').authInterceptor
const Tpls = translator(require('../tpl/ActionTpl'), 1)
const schedule = require('node-schedule')
const handleError = (err) => {
  console.log(err)
}

const doAction = async (ctx) => {
  if (!authInterceptor(ctx)) {
    return
  }
  if (!ctx.params.action) {
    ctx.response.status = 422
    ctx.body = {
      err: 'No Query Param'
    }
    return
  }
  const type = ctx.params.action
  const {id, target} = ctx.query
  const tpls = Tpls.get(type)
  console.log(tpls)

  if (tpls.operation === 'walk') {
    const user = ctx.header.authorization.decoded
    const personDoc = await Person.findOne({user_id: user.id})
    if (personDoc.current.toObject() !== 'idle') {
      throw Error('当前人物不在空闲状态')
    }
    await Person.update({_id: personDoc._id}, {$set: { current: 'moving' }})
    const targetPosition = {
      // lon: ctx.query.lon,
      // lat: ctx.query.lat
      lon: 60,
      lat: 24
    }
    const startPosition = personDoc.position

    const error = {
      lon: (targetPosition.lon - startPosition.lon) / 5,
      lat: (targetPosition.lat - startPosition.lat) / 5
    }
    let count = 0

    const job = schedule.scheduleJob('* /1 * * * *', function () {
      console.log('position timer task')
      count++
      Person.update(
        {_id: personDoc._id},
        {
          $set: {
            'position.lon': startPosition.lon + error.lon * count,
            'position.lat': startPosition.lat + error.lat * count

          }
        }
      )
      if (count === 5) {
        job.cancel()
      }
    })
  }
}

module.exports = {
  doAction
}
