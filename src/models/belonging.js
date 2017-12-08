const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BelongingSchema = new Schema({
  owner_id: {
    type: Schema.Types.ObjectId
  },
  name: {
    type: String,
    require: true
  },
  type: {
    type: String,
    require: true
  },
  result: {},
  des: {
    type: String
  }
})

module.exports = mongoose.model('Belonging', BelongingSchema)
