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
    if(typeof ctx.request.body === 'object'){
      data = ctx.request.body
    }else{
      data = JSON.parse(ctx.request.body)
    }
    console.log(data);
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
    }, ['_id','__v'])
  })
}


export let GetAllBelongs = async (ctx) => {
    if (!ctx.params.id) {
    throw new Error('no person id')
  }
  await Person.findOne()
    .where('id').equals(ctx.params.id)
    .select('belogings')
    .exec((err, belongsDoc) => {
      if (err) {
        throw new Error(err.toString())
      }
      ctx.body = {
        ...belongsDoc.map(beloging => {
          return omit({
            ...beloging.toObject()
          },['_id','__v'])
        })
      }
    })
}


export let GetBelongsOf = async (ctx) => {
    if (!ctx.params.id) {
    throw new Error('no person')
  }
  await Person.findOne()
    .where('id').equals(ctx.params.id)
    .select('belogings')
    .exec((err, belongsDoc) => {
      if (err) {
        throw new Error(err.toString())
      }
      //查询选择type
      ctx.body = {
        ...belongsDoc.toObject()
      }
    })
}


export let CreateBelong = async ctx => {
  let data 
}


export let GetBelong = async ctx => {
  let data
}

export let UseBelong = async ctx => {
  let data
}