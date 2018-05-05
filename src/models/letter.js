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
  from_user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  to_user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

LetterSchema.set('toObject', {
  transform: function (doc, ret, options) {
    ret.id = ret._id
    delete ret._id
    delete ret.__v
  }
})

module.exports = mongoose.model('Letter', LetterSchema)
