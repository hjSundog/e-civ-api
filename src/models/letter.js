const mongoose = require('mongoose')
const Schema = mongoose.Schema

const LetterSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  create_time: {
    type: Date
  },
  from_userid: {
    type: [Schema.Types.ObjectId]
  },
  to_userid: {
    type: [Schema.Types.ObjectId]
  }
})

LetterSchema.pre('save', function (next) {
  var letter = this
  if (this.isModified('create_time') || this.isNew) {
    letter.create_time = Date
    next()
  } else {
    return next()
  }
})

module.exports = mongoose.model('Letter', LetterSchema)
