const jwt = require('jsonwebtoken')
const omit = require('../lib/omit')
const Person = require('../models/person')
const User = require('../models/user')
const authInterceptor = require('../tool/Auth').authInterceptor

const path = require('path')
const fs = require('fs')
const publicKey = fs.readFileSync(path.join(__dirname, '../../publicKey.pub'))

const handleError = (err) => {
  console.log(err)
}

const GetAll = async (ctx) => {
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
        ...userDocs.map(userDoc => {
          return {
            ...userDoc.toObject()
          }
        })
      ]
    })
}

const GetById = async (ctx) => {
  if (!ctx.params.id) {
    ctx.response.status = 422
    ctx.body = {
      err: 'No Query Param'
    }
    return
  }
  await User.findOne()
    .where('_id').equals(ctx.params.id)
    .select({ name: 1, person_id: 1, meta: 1 })
    .exec((err, userDoc) => {
      if (err) handleError(err)

      if (!userDoc) {
        ctx.response.status = 404
        ctx.body = {
          err: 'Not Found'
        }
        return
      }
      ctx.body = {
        ...userDoc.toObject()
      }
    })
}

const Login = async (ctx) => {
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
  if (!userDoc) {
    ctx.body = {
      err: 'user not found'
    }
    ctx.response.status = 404
    return
  }
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

const Signup = async (ctx) => {
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

const CreatePerson = async (ctx) => {
  if (!authInterceptor(ctx)) {
    return
  }

  let data // 请求数据
  try {
    data = ctx.request.body
  } catch (e) {
    return
  }

  if (!ctx.params.id) {
    ctx.response.status = 422
    ctx.body = {
      err: 'No Query Param'
    }
    return
  }
  const userDoc = await User.findOne()
    .where('_id').equals(ctx.params.id)
    .select({ name: 1, person_id: 1, meta: 1 })
    .exec((err, userDoc) => {
      if (err) handleError(err)

      if (!userDoc) {
        ctx.response.status = 404
        ctx.body = {
          err: 'User Not Found'
        }
        return
      }
      ctx.body = {
        ...userDoc.toObject()
      }
    })
  // 没有用户
  if (!userDoc) {
    return
  }

  // 查询用户是否已经有person
  if (userDoc.person_id) {
    ctx.body = {
      err: 'The user has already have a game character'
    }
    ctx.response.status = 400
    return
  }

  // 查询是否有同名person
  const sameNamePerson = await Person.findOne()
    .where('nickname').equals(data.nickname)
    .exec((err, personDoc) => {
      if (err) handleError(err)
      if (personDoc && personDoc.id) {
        ctx.body = {
          err: 'Duplicate nickname for character'
        }
        ctx.response.status = 400
      }
    })
  if (sameNamePerson) {
    return
  }

  var person = new Person({
    nickname: data.nickname,
    user_id: userDoc.id,
    avatar: data.avatar,
    attributes: {
      str: 1,
      dex: 1,
      con: 1,
      int: 1,
      wis: 1,
      cha: 1
    },
    items: [],
    conditions: {
      health: 100,
      maxHealth: 100,
      stamina: 120,
      maxStamina: 120
    },
    status: [],
    race: data.race,
    age: data.age,
    gender: data.gender || 'female',
    description: data.description
  })
  // 这两个请求分开会不会有可能导致数据的不一致
  await person.save(function (err, person) {
    if (err) handleError(err)

    ctx.body = omit({
      ...person.toObject()
    }, ['_id', '__v'])
  })
  // 更新user的person_id
  userDoc.person_id = person.id
  await userDoc.save(function (err, updatedUser) {
    if (err) handleError(err)
  })
}

module.exports = {
  GetAll,
  GetById,
  Login,
  Signup,
  CreatePerson
}
