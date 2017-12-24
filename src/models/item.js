const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SubItem = new Schema({
  attributes: {
    attribute: {
      type: String,
      enum: ['BoonDuration', 'ConditionDamage', 'Healing', 'Power', 'CritDamage', 'Precision', 'Vitality', 'Toughness']
    },
    modifier: Number
  },
  buff: {
    skill_id: Schema.Types.ObjectId,
    description: String
  }
})

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
    enum: ['Armor', 'CraftMaterial', 'Trait', 'MiniPet', 'Bag', 'Consumable', 'Container', 'Weapon']
  },
  description: {
    type: String,
    trim: true
  },
  rarity: {
    type: String,
    enum: ['Junk', 'Basic', 'Fine', 'Masterword', 'Rare', 'Exotic', 'Ascended', 'legendary']
  },
  level: Number,
  vendor_value: {
    type: Number,
    require: true,
    default: 0
  },
  flags: {
    type: [String]
  },
  restrictions: {
    type: [String]
  },
  details: {
    enum: [{
      type: {
        type: String,
        enum: ['Coat', 'Helm', 'Gloves', 'Leggings', 'Boots']
      },
      defense: Number,
      infix_upgrade: SubItem
    },
    {
      type: {
        type: String,
        enum: ['Food', 'Immediate', 'Generic', 'Unlock', 'Booze']
      },
      description: String,
      duration_ms: String,
      name: String
    },
    {
      type: {
        type: String,
        enum: ['Default', 'GiftBox']
      }
    },
    {
      type: {
        type: String,
        enum: ['One-handed main hand', 'One-handed off hand', 'Two-handed', 'Other']
      },
      damage_type: {
        type: String,
        enum: ['Fire', 'Ice', 'Lightning', 'Physical']
      },
      min_power: Number,
      max_power: Number,
      defense: Number,
      infix_upgrade: SubItem
    }
    ]
  }
})

module.exports = mongoose.model('Item', ItemSchema)
