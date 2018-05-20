const Item = require('./item')
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const omit = require('../lib/omit')

// pre remove
const UserSchema = require('./user')

const PersonSchema = new Schema({
  // CORE PART
  user_id: {
    type: String
  },
  nickname: {
    type: String,
    unique: true,
    require: true
  },
  race: { // 扩展字段，暂时没用
    type: String
  },
  avatar: {
    type: String
  },
  gender: {
    type: String,
    enum: ['male', 'female']
  },
  age: { // 角色年龄
    type: Number
  },
  position: {
    lat: {
      type: Number
    },
    lon: {
      type: Number
    }
  },
  current: { // 现在的状态
    type: {
      type: String,
      enum: ['idle', 'moving', 'working', 'fighting']
    },
    meta: Schema.Types.Mixed
  },

  items: [{
    type: Schema.Types.ObjectId,
    ref: 'Item'
  }],
  conditions: { // 当前状态
    health: { // 健康
      type: Number
    },
    maxHealth: { // 健康最大值
      type: Number
    },
    stamina: { // 耐力
      type: Number
    },
    maxStamina: { // 耐力最大值
      type: Number
    }
  },
  status: [],
  attributes: { // 基本六维
    str: {
      type: Number
    },
    dex: {
      type: Number
    },
    con: {
      type: Number
    },
    int: {
      type: Number
    },
    wis: {
      type: Number
    },
    cha: {
      type: Number
    }
  },
  description: String
  // // GUILD PART
  // guilds: [ // 加入的工会ID集

  // ],
  // guild: { // 当前展示工会ID，参考激战2
  //   type: String
  // },
  // guild_leader: [ // 领导的工会

  // ],
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

PersonSchema.set('toObject', {
  transform: function (doc, ret, options) {
    ret.id = ret._id
    ret.position.lat = ret.position.lat.toFixed(6)
    ret.position.lon = ret.position.lon.toFixed(6)
    delete ret._id
    delete ret.__v
  }
})

PersonSchema.pre('remove', function (next) {
  UserSchema.findOneAndUpdate({ person_id: this._id }, { person_id: null }).exec()
  next()
})

PersonSchema.statics.getItems = async function (id) {
  const rt = await this.findById(id)
    .populate({
      path: 'items'
    })
    .exec((err, person) => {
      if (err) {
        throw new Error(err)
      }
    })
  return rt.items.map(ele => {
    return omit(ele.toObject(), ['_id', '__v'])
  })
}

PersonSchema.statics.findByIdAndCreateItem = async function ({ id, type, count }, cb) {
  const tpl = Item.getTpl(type)
  if (!tpl) {
    throw new Error('can\'t get tpl of ' + type)
  }
  const item = await new Item({
    owner_id: id,
    ...tpl,
    count: count

  }).save((err, item) => {
    if (err) {
      throw new Error(err)
    }
  })
  // 添加索引
  const person = await this.findById(id)
    .exec((err, person) => {
      if (err) {
        throw new Error(err)
      }
    })
  person.items.push(item._id)
  await person.save((err, person) => {
    if (err) {
      throw new Error(err)
    }
  })
  // 获取所有对象
  return this.getItems(id)
}

PersonSchema.statics.findByIdAndRemoveItem = async function (personId, itemId, count, cb) {
  // 如果有多个，则减少指定个，如果不够返回不够，如果用完，删除
  count = +count
  let rt, index, item
  const person = await this.findById(personId)
    .populate({
      path: 'items'
    })
    .exec((err, person) => {
      if (err) {
        throw new Error(err)
      }
    })

  // 索引
  index = person.items.findIndex(ele => {
    return ele.id === itemId
  })
  // 物品
  item = person.items[index]
  if (!item) {
    rt = {
      err: 'the target is not exsist'
    }
    return
  }
  if (item.count > count) {
    item.count -= count
    await item.save((err, itemDoc) => {
      if (err) {
        throw new Error(err)
      }
      // 获取该人物物品
      rt = person.items.map(ele => {
        return omit(ele.toObject(), ['_id', '__v'])
      })
    })
  } else if (item.count === count) {
    // 删除
    // 删除person索引
    person.items.splice(index, 1)
    await new Promise((resolve, reject) => {
      // 删除索引
      person.save((err, person) => {
        if (err) {
          reject(err)
        }
        rt = person.items.map(ele => {
          return omit(ele.toObject(), ['_id', '__v'])
        })
        resolve(rt)
      })
    }).then((data) => {
      // 删除对象
      Item.findByIdAndRemove(itemId)
        .exec((err, itemDoc) => {
          if (err) {
            throw new Error(err)
          }
        })
    }).catch(err => {
      throw new Error(err)
    })
  } else {
    rt = {
      err: 'The max count you can use is ' + item.count + '，please check the count you want to use'
    }
    if (typeof cb === 'function') {
      cb(rt, null)
    }
  }
  return rt
}

module.exports = mongoose.model('Person', PersonSchema, 'people')
