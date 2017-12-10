import Person from '../models/person'
import omit from '../lib/omit'

export let GetById = async (ctx) => {
  if (!ctx.params.name) {
    throw new Error('no name')
  }
  await Person.findOne()
    .where('id').equals(ctx.params.id)
    .select({ name: 1, user_id: 1, _id: 0 })
    .exec((err, personDoc) => {
      if (err) {
        throw new Error(err.toString())
      }
      ctx.body = {
        ...personDoc.toObject()
      }
    })
}

export let Post = async (ctx) => {
  let data
  try {
    if (typeof ctx.request.body === 'object') {
      data = ctx.request.body
    } else {
      data = JSON.parse(ctx.request.body)
    }
    console.log(data)
  } catch (e) {
    console.error(e)
    return
  }
  var person = new Person({
    name: data.name,
    person_id: null,
    attributes: {
      str: 1,
      dex: 1,
      con: 1,
      int: 1,
      wis: 1,
      cha: 1
    },
    belogings: [],
    conditions: {
      health: 100,
      maxHealth: 100,
      stamina: 120,
      maxStamina: 120
    },
    status: [],
    meta: {
      age: data.meta.age || null,
      sex: data.meta.sex || 'female'
    }
  })
  await person.save(function (err, person) {
    if (err) {
      throw new Error(err.toString())
    }
    console.log(person)
    ctx.body = omit({
      ...person.toObject()
    }, ['_id', '__v'])
  })
}
/**
 * 获取用户所有物品
 * @param {*id} ctx 用户id
 */
export let GetAllItems = async (ctx) => {
  if (!ctx.params.id) {
    throw new Error('no person id')
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
      console.log(rt)
      ctx.body = {
        rt
      }
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
 * 获取某个用户的某种类型的物品
 * @param {*id} ctx 用户id
 * @param {*type} ctx 物品类型
 */
export let GetItemsOf = async (ctx) => {
  if (!ctx.params.id) {
    throw new Error('no person')
  }
  await Person.findOne()
    .where('_id').equals(ctx.params.id)
    .populate({
      path: 'items',
      match: {type: ctx.params.type}
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
export let CreateItem = async ctx => {
  let data
  try {
    if (typeof ctx.request.body === 'object') {
      data = ctx.request.body
    } else {
      data = JSON.parse(ctx.request.body)
    }
    console.log(data)
  } catch (e) {
    console.error(e)
    return
  }
  if (!ctx.params.id) {
    throw new Error('no person')
  }
  data = {id: ctx.params.id, ...data}

  await Person.findByIdAndCreateItem(data)
}
/**
 * 获取用户某个物品
 * @param {*id} ctx 用户id
 * @param {*itemId} ctx 物品id
 */
export let GetItem = async ctx => {
  if (!ctx.params.id) {
    throw new Error('no person')
  }
  if (!ctx.params.itemId) {
    throw new Error('no Item')
  }
  await Person.findById(ctx.params.id)
    .populate({
      path: 'items',
      match: {
        _id: ctx.params.itemId
      }
    })
    .exec((err, ItemDoc) => {
      if (err) {
        throw new Error(err.toString())
      }
      ctx.body = omit({
        ...ItemDoc.toObject()
      }, ['_id', '__v'])
    })
}
/**
 * 使用/消耗物品
 * @param {*id} ctx 用户id
 * @param {*itemId} ctx 物品id
 */
export let UseItem = async ctx => {
  let data
  try {
    if (typeof ctx.request.body === 'object') {
      data = ctx.request.body
    } else {
      data = JSON.parse(ctx.request.body)
    }
    console.log(data)
  } catch (e) {
    console.error(e)
    return
  }
  if (!ctx.params.id) {
    throw new Error('no person')
  }
  if (!ctx.params.itemId) {
    throw new Error('no Item')
  }
  await Person.findByIdAndRemoveItem(ctx.params.id, ctx.params.itemId)
}
