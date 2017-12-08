const mongoose = require('mongoose')
const Schema = mongoose.Schema

const FriendsSchema = new Schema({
  person_id: Schema.Types.ObjectId,
  friends: [{
    person_id: Schema.Types.ObjectId
  }]
})

module.exports = mongoose.model('Friends', FriendsSchema)
