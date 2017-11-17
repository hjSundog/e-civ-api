const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const UserSchema = new Schema({
  name: { // 显示名称，昵称
    type: String,
    unique: true,
    require: true
  },
  username: { // 登录用户名
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    require: true
  },
  person_id: {
    type: [Schema.Types.ObjectId]
  },
  meta: {
    age: {
      type: Number
    },
    sex: {
      type: String,
      enum: ['male', 'female']
    }
  }
})

// 添加用户保存时中间件对password进行bcrypt加密,这样保证用户密码只有用户本人知道
UserSchema.pre('save', function (next) {
  var user = this
  if (this.isModified('password') || this.isNew) {
    bcrypt.genSalt(10, function (err, salt) {
      if (err) {
        return next(err)
      }
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) {
          return next(err)
        }
        user.password = hash
        next()
      })
    })
  } else {
    return next()
  }
})
// 校验用户输入密码是否正确
UserSchema.methods.comparePassword = function (passw, cb) {
  console.log(this)
  return new Promise((resolve, reject) => {
    bcrypt.compare(passw, this.password, (err, isMatch) => {
      cb(err || null, isMatch)
      resolve()
    })
  })
}

module.exports = mongoose.model('User', UserSchema)
