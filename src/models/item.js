// const SchemaTypes = require('mongoose').SchemaTypes

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Tpls = require('../tpl/translator')
const ItemSchema = new Schema({
  owner_id: {
    type: Schema.Types.ObjectId
  },
  name: {
    type: String,
    require: true,
    trim: true
  },
  icon: String,
  type: {
    type: String,
    require: true,
    trim: true,
    enum: ['Armor', 'CraftMaterial', 'MiniPet', 'Bag', 'Consumable', 'Container', 'Weapon']
  },
  description: {
    type: String,
    trim: true
  },
  rarity: {
    type: String,
    enum: ['Junk', 'Basic', 'Fine', 'Masterwork', 'Rare', 'Exotic', 'Ascended', 'legendary']
  },
  level: Number,
  vendor_value: {
    type: Number,
    require: true,
    default: 0
  },
  effect: {
    health: Number,
    maxHealth: Number,
    stamina: Number,
    maxStamina: Number,
    gender: String,
    nickname: String,
    str: Number,
    dex: Number,
    con: Number,
    int: Number,
    wis: Number,
    cha: Number,
    position: {
      lat: Number,
      lon: Number
    },
    current: String
  },
  // flags标志用于指定物品的特殊性：比如是否唯一,是否可卖等
  flags: {
    type: [String]
  },
  // 限制条件，比如武器(或者某些东西)强制count为1以便以后扩展什么耐久度，某些武器只有某些职业才能使用，这里用不到
  // 可选值：NotGroup()
  restrictions: {
    type: [String]
  },
  count: {
    type: Number,
    default: 1,
    require: true
  },
  // 物品特殊性。额外的详细信息，不同种物品一般不同
  details: {
    category: {
      type: String,
      enum: ['Coat', 'Helm', 'Gloves', 'Leggings', 'Boots', 'Food', 'Alcohol', 'Leveling', 'Boosts', 'Utility', 'Teleport', 'Default', 'GiftBox', 'One-handed main hand', 'One-handed off hand', 'Two-handed', 'Other']
    },
    defense: Number,
    recipe: [{
      gradient: String,
      count: Number
    }],
    gradient: String,
    state: String,
    description: String,
    duration_s: String,
    apply_count: Number,
    damage_type: {
      type: String,
      enum: ['Fire', 'Ice', 'Lightning', 'Physical']
    },
    min_power: Number,
    max_power: Number
    // Armor 防具
    // enum: [{
    //   type: {
    //     type: String,
    //     enum: ['Coat', 'Helm', 'Gloves', 'Leggings', 'Boots']
    //   },
    //   defense: Number,
    //   recipe: [
    //     {
    //       gradient: String,
    //       count: Number
    //     }
    //   ] // 合成配方
    // },
    // // Consumable 消耗品
    // {
    //   // 消耗品 分类：食物，饮料，提升等级，buff类，工具, 通信....暂时就这么多了
    //   type: {
    //     type: String,
    //     enum: ['Food', 'Alcohol', 'Leveling', 'Boosts', 'Utility', 'Teleport']
    //   },
    //   state: String, // 当前状态 比如是否可用等状态
    //   description: String, // 效果描述 比如 +5hp +3power 等
    //   duration_s: String,
    //   apply_count: Number, // 每次消耗
    //   recipe: [
    //     {
    //       gradient: String,
    //       count: Number
    //     }
    //   ], // 合成配方
    //   gradient: String // 那个物品的合成原料
    // },
    // // Container 容器
    // {
    //   type: {
    //     type: String,
    //     enum: ['Default', 'GiftBox']
    //   }
    // },
    // // Weapon 武器
    // {
    //   type: {
    //     type: String,
    //     enum: ['One-handed main hand', 'One-handed off hand', 'Two-handed', 'Other']
    //   },
    //   damage_type: {
    //     type: String,
    //     enum: ['Fire', 'Ice', 'Lightning', 'Physical']
    //   },
    //   min_power: Number,
    //   max_power: Number,
    //   defense: Number, // 防御 只用于盾
    //   recipe: [
    //     {
    //       gradient: String,
    //       count: Number
    //     }
    //   ] // 合成配方
    // }
    // ]
  }
})

ItemSchema.set('toObject', {
  transform: function (doc, ret, options) {
    ret.id = ret._id
    delete ret._id
    delete ret.__v
  }
})

ItemSchema.statics.getTpl = (tpl) => {
  return Tpls.get(tpl)
}

module.exports = mongoose.model('Item', ItemSchema)
