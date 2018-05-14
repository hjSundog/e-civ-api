const mongoose = require('mongoose')
const Schema = mongoose.Schema

const FriendSchema = new Schema({
  person_id: Schema.Types.ObjectId,
  friends: [{
    person_id: Schema.Types.ObjectId
  }]
})

FriendSchema.set('toObject', {
  transform: function (doc, ret, options) {
    ret.id = ret._id
    delete ret._id
    delete ret.__v
  }
})

module.exports = mongoose.model('Friend', FriendSchema, 'friends')
