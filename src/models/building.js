const mongoose = require('mongoose')
const Schema = mongoose.Schema
const translator = require('../tpl/translator')
const Tpls = translator(require('../tpl/BuildingTpl'), 1)
const omit = require('../lib/omit')
const BuildingSchema = new Schema({
  // 占据者
  holder: String,
  name: String,
  type: {
    type: String,
    require: true
  },
  position: {
    lat: Number,
    lon: Number
  },
  // 占地范围
  size: {
    scaleX: Number,
    scaleY: Number
  },
  level: Number,
  //   // 可以进行的操作以及消耗的物品
  //   actions: [{
  //     operation: String,
  //     // 所需物品
  //     need: [{
  //       name: String,
  //       count: Number
  //     }],
  //     stamina: Number,
  //     duration: Number
  //   }],
  // 本建筑当前所产生的资源
  resource: [{
    name: String,
    count: Number
  }]
})

BuildingSchema.set('toObject', {
  transform: function (doc, ret, options) {
    ret.id = ret._id
    delete ret._id
    delete ret.__v
  }
})

BuildingSchema.statics.getTpl = (tpl) => {
  return Tpls.get(tpl)
}

BuildingSchema.methods.linkTpl = function () {
  const tpls = Tpls.get(this.type)
  const data = omit({
    ...this.toObject()
  }, ['_id', '__v'])
  return {
    ...tpls,
    ...data
  }
}

module.exports = mongoose.model('building', BuildingSchema, 'buildings')
