const mongoose = require('mongoose')
const Schema = mongoose.Schema

const GroupSchema = new Schema({
  name: {
    type: String,
    unique: true,
    require: true
  },
  type: {
    type: String,
    require: true
  },
  icon: String,
  sub_group: {
    type: [Schema.Types.ObjectId]
  },
  level: {
    type: Number
  },
  totalMember: {
    type: Number
  },
  relationship: {
    positive: [Schema.Types.ObjectId],
    negtive: [Schema.Types.ObjectId]
  },
  time: {
    type: Date
  },
  description: {
    type: String
  },
  influence: Number
})

module.exports = mongoose.model('Group', GroupSchema)
