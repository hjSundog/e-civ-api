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
    data = JSON.parse(ctx.request.body)
  } catch (e) {
    console.error(e)
    return
  }
  var person = new Person({
    name: data.name,
    password: data.password,
    person_id: null,
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
      ...person
    }, ['_id'])
  })
}


export let GetAllBelogings = async (ctx) => {
    if (!ctx.params.id) {
    throw new Error('no person id')
  }
  await Person.findOne()
    .where('id').equals(ctx.params.id)
    .select('belogings')
    .exec((err, belogingsDoc) => {
      if (err) {
        throw new Error(err.toString())
      }
      ctx.body = {
        ...beklogingsDoc.toObject()
      }
    })
}


export let GetBelogingsOf = async (ctx) => {
    if (!ctx.params.id) {
    throw new Error('no person')
  }
  await Person.findOne()
    .where('id').equals(ctx.params.id)
    .select('belogings')
    .exec((err, belogingsDoc) => {
      if (err) {
        throw new Error(err.toString())
      }
      //查询选择type
      ctx.body = {
        ...beklogingsDoc.toObject()
      }
    })
}