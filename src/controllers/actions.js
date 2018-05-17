const omit = require('../lib/omit')
const Actions = require('../models/actions')
const translator = require('../tpl/translator')
const authInterceptor = require('../tool/Auth').authInterceptor
const Tpls = translator(require('../tpl/ActionTpl'), 1)
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
    // console.log(tpls)
}


module.exports = {
    doAction
}