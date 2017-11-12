const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PersonSchema = new Schema({
  user_id: {
    type: [Schema.Types.ObjectId]
  },
  name: {
    type: String,
    unique: true,
    require: true
  },
  conditions: {
    health: {
      type: [Number]
    },
    maxHealth: {
      type: [Number]
    },
    stamina: {
      type: [Number]
    },
    maxStamina: {
      type: [Number]
    }
  },
  status: [],
  attributes: {
    str: {
      type: [Number]
    },
    dex: {
      type: [Number]
    },
    con: {
      type: [Number]
    },
    int: {
      type: [Number]
    },
    wis: {
      type: [Number]
    },
    cha: {
      type: [Number]
    }
  }
})

module.exports = mongoose.model('Person', PersonSchema)
