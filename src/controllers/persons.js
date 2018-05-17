const Person = require('../models/person')
const User = require('../models/user')
const Item = require('../models/item')
const omit = require('../lib/omit')

const authInterceptor = require('../tool/Auth').authInterceptor

const handleError = (err) => {
  console.log(err)
}

// TODO: 像map一样拆封文件

const GetById = async (ctx) => {
  if (!ctx.params.id) {
    ctx.response.status = 422
    ctx.body = {
      err: 'No Query Param'
    }
    return
  }
  await Person.findOne()
    .where('_id').equals(ctx.params.id)
    .exec((err, personDoc) => {
      if (err) handleError(err)

      if (!personDoc) {
        ctx.response.status = 404
        ctx.body = {
          err: 'Not Found'
        }
        return
      }
      ctx.body = omit({
        ...personDoc.toObject()
      }, ['_id', '__v'])
    })
}

const UpdatePerson = async (ctx) => {
  if (!authInterceptor(ctx)) {
    return
  }
  if (!ctx.params.id) {
    ctx.response.status = 422
    ctx.body = {
      err: 'No Query Param'
    }
    return
  }
  let data // 请求数据
  try {
    data = ctx.request.body
  } catch (e) {
    return
  }
  const person = await Person.findById(ctx.params.id)
    .exec((err, person) => {
      if (err) {
        handleError(err)
        throw new Error(err)
      }
      Object.keys(data).forEach(key => {
        // 是否顶级
        if (person[key]) {
          person[key] = data[key]
        }

        if (person['conditions'][key]) {
          person['conditions'][key] += data[key]
        }

        if (person['attributes'][key]) {
          person['attributes'][key] += data[key]
        }
      })
    })

  await person.save((err, personDoc) => {
    if (err) {
      handleError(err)
      throw new Error(err)
    }
  })

  ctx.body = omit({
    ...person.toObject()
  }, ['_id', '__v', 'avatar'])
}

const Post = async (ctx) => {
  if (!authInterceptor(ctx)) {
    return
  }

  let data // 请求数据
  try {
    data = ctx.request.body
  } catch (e) {
    return
  }

  const user = ctx.header.authorization.decoded
  // 查询用户是否已经有person
  const userDoc = await User.findOne()
    .where('name').equals(user.name)
    .exec((err, userDoc) => {
      if (err) handleError(err)
    })
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
    position: {
      lat: Math.random() * 140 - 70,
      lon: Math.random() * 360 - 180
    },
    current: 'idle',
    status: [],
    race: data.race,
    age: data.age,
    gender: data.gender || 'female',
    description: data.description
  })
  // 这两个请求分开会不会有可能导致数据的不一致
  await person.save(function (err, person) {
    if (err) handleError(err)

    ctx.body = {
      ...person.toObject()
    }
  })
  // 更新user的person_id
  userDoc.person_id = person.id
  await userDoc.save(function (err, updatedUser) {
    if (err) handleError(err)
  })
}

const Delete = async (ctx) => {
  if (!authInterceptor(ctx)) {
    return
  }
  if (!ctx.params.id) {
    ctx.response.status = 422
    ctx.body = {
      err: 'No Query Param'
    }
    return
  }

  const person = await Person.findOne()
    .where('_id').equals(ctx.params.id)
    .exec((err, personDoc) => {
      if (err) handleError(err)
    })
  if (!person) {
    ctx.body = {
      err: 'No person'
    }
    ctx.response.status = 404
    return
  }

  await person.remove((err, res) => {
    if (!err) {
      ctx.response.status = 204
    }
  })
}
/**
 * 获取用户所有物品
 * @param {*id} ctx 用户id
 */
const GetAllItems = async (ctx) => {
  if (!authInterceptor(ctx)) {
    return
  }
  if (!ctx.params.id) {
    ctx.response.status = 422
    ctx.body = {
      err: 'No Query Param'
    }
    return
  }
  let hasType = ctx.query.type?true:false
  if (hasType) {
    await GetItemsOf(ctx)
    return 
  }
  await Person.findById(ctx.params.id)
    .populate('items')
    .exec((err, ItemsDoc) => {
      if (err) {
        throw new Error(err.toString())
      }
      let rt = ItemsDoc.items.map(Item => {
        return omit({
          ...Item.toObject()
        }, ['_id', '__v'])
      })
      // console.log(rt)
      ctx.body = rt
      // let tasks = ItemsDoc.Items.map(beloging => {
      //   return new Promise((resolve, reject) => {
      //     Iteming.findById(beloging)
      //       .exec((err, Item) => {
      //         if (err) {
      //           throw new Error(err)
      //         }
      //         resolve(omit({
      //           ...Item.toObject()
      //         }, ['_id', '__v'])
      //         )
      //       })
      //   })
      // })

      // Promise.all(tasks, (values) => {
      //   ctx.body = {
      //     ...values
      //   }
      // })
    })
}
/**
 * 获取某个用户的某种类型的物品, 这里没啥必要
 * @param {*id} ctx 用户id
 * @param {*type} ctx 物品类型
 */
const GetItemsOf = async (ctx) => {
  if (!ctx.params.id) {
    ctx.response.status = 422
    ctx.body = {
      err: 'No Query Param'
    }
    return
  }
  await Person.findOne()
    .where('_id').equals(ctx.params.id)
    .populate({
      path: 'items',
      match: { type: ctx.query.type }
    })
    .exec((err, ItemsDoc) => {
      if (err) {
        throw new Error(err.toString())
      }
      ctx.body = {
        ...ItemsDoc.items.map(Item => {
          return omit({
            ...Item.toObject()
          }, ['_id', '__v'])
        })
      }
    })
}
/**
 * 用户创建对象
 * @param {*id} ctx 用户id
 */
const CreateItem = async ctx => {
  if (!authInterceptor(ctx)) {
    return
  }
  let data
  try {
    data = ctx.request.body
  } catch (e) {
    throw new Error('api request error')
  }
  if (!ctx.params.id) {
    ctx.response.status = 422
    ctx.body = {
      err: 'No Query Param'
    }
    return
  }
  // 判断约束
  // 是否是一个一组
  const tpl = Item.getTpl(data.type)
  if (!tpl) {
    ctx.response.status = 422
    ctx.body = {
      err: data.type + ' is not the item of our website,please check the spell of it'
    }
    return
  }
  let mustCreate = tpl.restrictions.includes('NotGroup')
  let targetItem
  // 查找是否存在该类型元素
  await Person.findById(ctx.params.id)
    .populate('items')
    .exec((err, ItemsDoc) => {
      if (err) {
        throw new Error(err.toString())
      }
      let rt = ItemsDoc.items.some(Item => {
        if (Item.toObject().name === data.type) {
          targetItem = Item
          return true
        }
        return false
      })
      // console.log(rt)
      mustCreate = rt ? mustCreate : true
    })

  if (!mustCreate) {
    // 如果没有强制新建一个对象，则在原来的基础上增加
    targetItem.count += data.count
    await targetItem.save((err, item) => {
      if (err) {
        throw new Error(err)
      }
    })
    const rt = await Person.getItems(ctx.params.id)
    ctx.body = rt
    return
  }
  data = { id: ctx.params.id, ...data }
  const rt = await Person.findByIdAndCreateItem(data)
  ctx.body = rt
}
/**
 * 获取用户某个物品
 * @param {*id} ctx 用户id
 * @param {*itemId} ctx 物品id
 */
const GetItem = async ctx => {
  // console.log(ctx.params.itemId)
  if (!ctx.params.id || !ctx.params.itemId) {
    ctx.response.status = 422
    ctx.body = {
      err: 'No Query Param'
    }
    return
  }
  await Person.findById(ctx.params.id)
    .populate({
      path: 'items',
      match: {
        _id: ctx.params.itemId
      }
    })
    .exec((err, person) => {
      if (err) {
        throw new Error(err.toString())
      }
      ctx.body = omit({
        ...person.items[0].toObject()
      }, ['_id', '__v'])
    })
}
/**
 * 使用/消耗物品
 * @param {*id} ctx 用户id
 * @param {*itemId} ctx 物品id
 */
const UseItem = async ctx => {
  if (!authInterceptor(ctx)) {
    return
  }
  if (!ctx.params.id || !ctx.params.itemId) {
    ctx.response.status = 422
    ctx.body = {
      err: 'No Query Param'
    }
    return
  }

  const data = await Person.findByIdAndRemoveItem(ctx.params.id, ctx.params.itemId, ctx.query.count || 1, (data, err) => {
    if (err) {
      throw new Error(err)
    }
  })
  ctx.body = data
}

const move = async (ctx) => {
  if (!authInterceptor(ctx)) {
    return
  }
  const user = ctx.header.authorization.decoded
  const personDoc = await Person.findOne({user_id: user.id})
  if (!ctx.params.lat || !ctx.params.lon) {
    ctx.response.status = 422
    ctx.body = {
      err: 'No Position Param'
    }
    return
  }
  if (personDoc.current.type !== 'idle') {
    ctx.response.status = 400
    ctx.body = {
      err: 'Person is not idle'
    }
  }
  const data = {}

  ctx.body = data
}

module.exports = {
  GetById,
  UpdatePerson,
  Post,
  Delete,
  GetAllItems,
  GetItemsOf,
  CreateItem,
  GetItem,
  UseItem
}
