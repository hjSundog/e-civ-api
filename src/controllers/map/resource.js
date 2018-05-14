const Resource = require('../../models/resource')
const Person = require('../../models/person')

const handleError = (err) => {
  console.log(err)
}

const GetRelativeResource = async (ctx) => {
  // 身份认证拦截器
  const user = ctx.header.authorization.decoded
  const personDoc = await Person.findOne({user_id: user.id})

  const resourceDocs = await Resource.find({})
  ctx.body = [
    ...resourceDocs.map(userDoc => {
      return {
        ...userDoc.toObject()
      }
    })
  ]
}

module.exports = {
  GetRelativeResource
}
