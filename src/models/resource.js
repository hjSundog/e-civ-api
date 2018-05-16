const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ResourceSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  intro: {
    type: String,
    required: true
  },
  image_url: {
    type: String
  },
  position: {
    lat: {
      type: Number
    },
    lon: {
      type: Number
    }
  }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

ResourceSchema.set('toObject', {
  transform: function (doc, ret, options) {
    ret.id = ret._id
    delete ret._id
    delete ret.__v
  }
})

module.exports = mongoose.model('Resource', ResourceSchema, 'resources')
