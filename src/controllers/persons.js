import Person from '../models/person'
import omit from '../lib/omit'
import Belong from '../models/belonging'

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

export let GetAllBelongs = async (ctx) => {
  if (!ctx.params.owner_id) {
    throw new Error('no person id')
  }
  await Person.findOne()
    .where('id').equals(ctx.params.owner_id)
    .select('belogings')
    .exec((err, belongsDoc) => {
      if (err) {
        throw new Error(err.toString())
      }
      ctx.body = {
        ...belongsDoc.map(beloging => {
          return omit({
            ...beloging.toObject()
          }, ['_id', '__v'])
        })
      }
    })
}

export let GetBelongsOf = async (ctx) => {
  if (!ctx.params.owner_id) {
    throw new Error('no person')
  }
  await Person.findOne()
    .where('_id').equals(ctx.params.owner_id)
    .populate({
      path: 'belongs',
      match: {type: ctx.params.type}
    })
    .exec((err, belongsDoc) => {
      if (err) {
        throw new Error(err.toString())
      }
      ctx.body = {
        ...belongsDoc.belongs.map(belong => {
          return omit({
            ...belong.toObject()
          }, ['_id', '__v'])
        })
      }
    })
}

export let CreateBelong = async ctx => {
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
  if (!ctx.params.owner_id) {
    throw new Error('no person')
  }
  if (!ctx.params.id) {
    throw new Error('no belong')
  }

  await Person.findOne()
    .where('_id').equals(ctx.params.owner_id)
    .select('belongs')
    .exec((err, belongDoc) => {
      if (err) {
        throw new Error(err.toString())
      }
      // 添加
      var belong = new Belong({
        owner_id: ctx.params.owner_id,
        name: data.name,
        targetType: [''],
        type: data.type,
        status: data.status || 'active',
        result: null,
        des: data.des || '',
        needs: data.needs
      })
      belong.save((err, belong) => {
        if (err) {
          ctx.body = {
            err: err.errmsg
          }
          ctx.response.status = 422
        } else {
          ctx.body = omit({
            ...belong.toObject()
          }, ['_id', '__v'])
        }
      })
    })
}

export let GetBelong = async ctx => {
  if (!ctx.params.owner_id) {
    throw new Error('no person')
  }
  if (!ctx.params.id) {
    throw new Error('no belong')
  }
  await Person.findOne()
    .where('_id').equals(ctx.params.owner_id)
    .populate({
      path: 'belongs',
      match: {
        _id: ctx.params.id
      }
    })
    .exec((err, belongDoc) => {
      if (err) {
        throw new Error(err.toString())
      }
      ctx.body = omit({
        ...belongDoc.toObject()
      }, ['_id', '__v'])
    })
}

export let UseBelong = async ctx => {
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
  if (!ctx.params.owner_id) {
    throw new Error('no person')
  }
  if (!ctx.params.id) {
    throw new Error('no belong')
  }

  await Person.findOne()
    .where('_id').equals(ctx.params.owner_id)
    .select('belongs')
    .exec((err, belongDoc) => {
      if (err) {
        throw new Error(err.toString())
      }
      // 删除
    })
}
