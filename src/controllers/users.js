import jwt from 'jsonwebtoken'
import omit from '../lib/omit'

import User from '../models/user'
import { authInterceptor } from '../tool/Auth'

import path from 'path'
import fs from 'fs'
const publicKey = fs.readFileSync(path.join(__dirname, '../../publicKey.pub'))

export let GetAll = async (ctx) => {
  // const _defaultOpts = {
  //   limit: 20,
  //   page: 1
  // }
  // let opts = {
  //   ..._defaultOpts,
  //   ctx.params
  // }

  // 身份认证拦截器
  if (!authInterceptor(ctx)) {
    return
  }
  await User.find()
    .select({ name: 1, username: 1, person_id: 1, meta: 1, _id: 0 })
    .exec((err, userDocs) => {
      if (err) {
        throw new Error(err.toString())
      }
      ctx.body = [
        ...userDocs.map(user => {
          return user.toObject()
        })
      ]
    })
}

export let GetByName = async (ctx) => {
  if (!ctx.params.name) {
    throw new Error('no name')
  }
  await User.findOne()
    .where('name').equals(ctx.params.name)
    .select({ name: 1, person_id: 1, meta: 1, _id: 0 })
    .exec((err, userDoc) => {
      if (err) {
        throw new Error(err.toString())
      }
      ctx.body = {
        ...userDoc.toObject()
      }
    })
}

export let Login = async (ctx) => {
  const data = ctx.request.body
  if (!data.username || !data.password) {
    throw new Error('no username or password')
  }
  const userDoc = await User.findOne()
    .where('username').equals(data.username)
    .exec((err, userDoc) => {
      if (err) {
        throw new Error(err.toString())
      }
      return userDoc
    })
  await userDoc.comparePassword(data.password, (err, isMatch) => {
    // 去除内部字段和密码的用户信息
    const openInfo = omit({
      ...userDoc.toObject()
    }, ['_id', '__v', 'password'])
    if (err) {
      console.error(err)
      ctx.body = {
        err: 'unknown error'
      }
      ctx.response.status = 500
    } else {
      console.log(`isMatch: ${isMatch}`)
      if (isMatch) {
        // 如果匹配则生成token
        const token = jwt.sign(openInfo, publicKey, { expiresIn: '24h' })
        ctx.body = {
          ...openInfo,
          token
        }
      } else {
        ctx.body = {
          err: 'password not match'
        }
        ctx.response.status = 403
      }
    }
  })
}

export let Signup = async (ctx) => {
  let data = ctx.request.body

  if (!data.name || !data.username || !data.password) {
    ctx.body = {
      err: 'require necessary filed'
    }
    ctx.response.status = 422
    return
  }
  var user = new User({
    name: data.name,
    username: data.username,
    password: data.password,
    person_id: null,
    meta: {
      age: data.meta.age || null,
      sex: data.meta.sex || 'female'
    }
  })
  await user.save(function (err, user) {
    if (err) {
      // throw new Error(err.toString())
      ctx.body = {
        err: err.errmsg
      }
      ctx.response.status = 422
    } else {
      console.log(user)
      ctx.body = omit({
        ...user.toObject()
      }, ['_id', '__v', 'password'])
    }
  }).catch((err) => {
    console.log(err.errmsg)
  })
}
