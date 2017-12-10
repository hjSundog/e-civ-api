const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ItemSchema = new Schema({
  owner_id: {
    type: Schema.Types.ObjectId
  },
  name: {
    type: String,
    require: true
  },
  type: {
    type: String
  },
  result: {},
  des: {
    type: String
  }
})

module.exports = mongoose.model('Item', ItemSchema)
