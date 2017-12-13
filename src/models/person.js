import Item from './item'
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PersonSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId
  },
  name: {
    type: String,
    unique: true,
    require: true
  },
  items: [{
    type: Schema.Types.ObjectId,
    ref: 'Item'
  }],
  conditions: {
    health: {
      type: Number
    },
    maxHealth: {
      type: Number
    },
    stamina: {
      type: Number
    },
    maxStamina: {
      type: Number
    }
  },
  status: [],
  attributes: {
    str: {
      type: Number
    },
    dex: {
      type: Number
    },
    con: {
      type: Number
    },
    int: {
      type: Number
    },
    wis: {
      type: Number
    },
    cha: {
      type: Number
    }
  }
})

PersonSchema.statics.findByIdAndCreateItem = async function (data, cb) {
  new Item({
    owner_id: data.id,
    name: data.name,
    targetType: [''],
    type: data.type || 'other',
    status: data.status || 'active',
    result: null,
    des: data.des || '',
    needs: data.needs
  }).save((err, item) => {
    if (err) {
      console.log('findByIdAndCreateBelong error:' + err)
      throw new Error(err)
    }
    this.findById(data.id)
      .exec((err, person) => {
        if (err) {
          throw new Error(err)
        }
        person.items.push(item._id)
        person.save((err, person) => {
          if (err) {
            console.log('person create item update failed!')
            throw new Error(err)
          }
          console.log('peson create item successful!')
          typeof cb === 'function' && cb()
        })
      })
  })
}

PersonSchema.statics.findByIdAndRemoveItem = async function (personId, itemId, cb) {
  Item.findByIdAndRemove(itemId)
    .exec((err, belong) => {
      if (err) {
        console.log('findByIdAndRemoveBelong err: ' + err)
        throw new Error(err)
      }
    })
  this.findById(personId)
    .select('items')
    .exec((err, person) => {
      if (err) {
        console.log('findByIdAndRemoveBelong err: ' + err)
        throw new Error(err)
      }
      let index = person.items.findIndex((cur, index) => {
        return cur._id === itemId
      })

      person.items.splice(index, 1)
      person.save((err, person) => {
        if (err) {
          throw new Error(err)
        }
        console.log('use belong successful!')
        typeof cb === 'function' && cb()
      })
    })
}

module.exports = mongoose.model('Person', PersonSchema)
