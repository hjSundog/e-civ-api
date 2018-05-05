const Letter = require('../models/letter')
const User = require('../models/user')
const mongoose = require('mongoose')

const authInterceptor = require('../tool/Auth').authInterceptor

const handleError = (err) => {
  console.log(err)
}

const GetListByOwn = async (ctx) => {
  // 身份认证拦截器
  const user = ctx.header.authorization.decoded
  const userDoc = await User.findOne()
    .where('name').equals(user.name)
    .exec((err, userDoc) => {
      if (err) handleError(err)
    })

  const page = parseInt(ctx.query.page) || 1
  const pageSize = parseInt(ctx.query.size) || 10
  const sort = parseInt(ctx.query.sort) || 'asc'

  const letterCount = await Letter
    .where({ $or: [{to_user: userDoc.id}, {from_user: userDoc.id}] })
    .count()
    .exec(function (err, count) {
      if (err) handleError(err)
    })
  await Letter.find()
    .where({ $or: [{to_user: userDoc.id}, {from_user: userDoc.id}] })
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .sort({
      created_at: sort
    })
    .populate('from_user')
    .populate('to_user')
    .exec(function (err, letterDocs) {
      if (err) handleError(err)
      ctx.body = {
        letters: [
          ...letterDocs.map(letter => {
            return letter.toObject()
          })
        ],
        page: page,
        pages: parseInt(letterCount / pageSize) + 1
      }
    })
}

const Get = async (ctx) => {
  if (!authInterceptor(ctx)) {
    return
  }
  const user = ctx.header.authorization.decoded
  const userDoc = await User.findOne()
    .where('name').equals(user.name)
    .exec((err, userDoc) => {
      if (err) handleError(err)
    })
  const letterId = ctx.params.id
  await Letter.findOne()
    .where({ _id: letterId })
    .exec(function (err, letterDoc) {
      if (err) handleError(err)
      if (userDoc.id !== letterDoc.to_user && userDoc.id !== letterDoc.from_user) {
        ctx.response.status = 403
        ctx.body = {
          err: 'Read others letter is forbidden'
        }
      } else {
        ctx.body = {
          ...letterDoc.toObject()
        }
      }
    })
}

const Post = async (ctx) => {
  // 身份认证拦截器
  if (!authInterceptor(ctx)) {
    return
  }
  const user = ctx.header.authorization.decoded
  const data = ctx.request.body

  // TODO: 检查Data格式
  var letter = new Letter({
    title: data.title,
    content: data.content,
    from_user: mongoose.Types.ObjectId(user.id),
    to_user: data.to_user
  })
  await letter.save(function (err, letter) {
    if (err) handleError(err)
    ctx.body = {
      ...letter.toObject()
    }
  })
}

module.exports = {
  GetListByOwn,
  Get,
  Post
}
