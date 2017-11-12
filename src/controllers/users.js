import omit from '../lib/omit'

import User from '../models/user'

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

export let Post = async (ctx) => {
  let data
  try {
    data = JSON.parse(ctx.request.body)
  } catch (e) {
    console.error(e)
    return
  }
  var user = new User({
    name: data.name,
    password: data.password,
    person_id: null,
    meta: {
      age: data.meta.age || null,
      sex: data.meta.sex || 'female'
    }
  })
  await user.save(function (err, user) {
    if (err) {
      throw new Error(err.toString())
    }
    console.log(user)
    ctx.body = omit({
      ...user
    }, ['_id'])
  })
}
