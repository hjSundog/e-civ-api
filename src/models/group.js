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
  sub_group: {
    type: [Schema.Types.ObjectId]
  },
  rank: {
    type: Number
  },
  /*     categories: {
        leaders: {

        },
        economic: {

        },
        society: {

        },
        policy: {
            type:
        }
    },
   attributes: {
        gold: {
            type: Number
        },
        energy: {
            type: Number
        }
    }, */
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
  info: {
    type: String
  }
})

module.exports = mongoose.model('Group', GroupSchema)
