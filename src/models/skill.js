const mongoose = require('mongoose')

const Schema = mongoose.Schema

const SkillSchema = new Schema({
  name: {
    type: String,
    unique: true,
    require: true
  },
  type: {
    type: String,
    require: true
  },
  des: {
    type: String
  },
  needs: {
    type: [Schema.Types.Mixed]
  },
  attach: {
    duration: {
      type: Number
    },
    delay: {
      type: Number
    },
    miss: {
      type: Number
    },
    priority: {
      type: Number
    }
  }
})
module.exports = mongoose.model('Skill', SkillSchema)
