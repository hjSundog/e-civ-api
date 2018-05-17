const omit = require('../lib/omit')
const Person = require('../models/person')
const translator = require('../tpl/translator')
const authInterceptor = require('../tool/Auth').authInterceptor
const Tpls = translator(require('../tpl/ActionTpl'), 1)
const handleError = (err) => {
  console.log(err)
}

const doAction = async (ctx) => {
  console.log('do action')
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
}

// const move = async (ctx) => {
//   if (!authInterceptor(ctx)) {
//     return
//   }
//   const user = ctx.header.authorization.decoded
//   const personDoc = await Person.findOne({user_id: user.id})
//   if (!ctx.params.lat || !ctx.params.lon) {
//     ctx.response.status = 422
//     ctx.body = {
//       err: 'No Position Param'
//     }
//     return
//   }
//   if (personDoc.current.type !== 'idle') {
//     ctx.response.status = 400
//     ctx.body = {
//       err: 'Person is not idle'
//     }
//   }
//   const data = {}

//   ctx.body = data
// }

module.exports = {
  doAction
}
