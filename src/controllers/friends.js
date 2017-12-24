import omit from '../lib/omit'
import Friends from '../models/friends'

export let GetByUserId = async (ctx) => {
  // 验证jwt，解析userID或者其他
  // 需要管理员权限
}

export let GetByOwn = async (ctx) => {
  // 验证jwt，解析userID或者其他

  await Friends.find()
    // .equals() 只获取自己的letter
    .select({ person_id: 1, friends: 1 })
    .exec((err, friendsDocs) => {
      if (err) {
        throw new Error(err.toString())
      }
      ctx.body = [
        ...friendsDocs.map(friends => {
          return omit(friends.toObject(), ['_id'])
        })
      ]
    })
}

export let AddFriend = async (ctx) => {
  const data = ctx.request.body
  // TODO: 补全userid部分
  var letter = new Friends({
    title: data.title,
    content: data.content,
    from_userid: null,
    to_userid: null
  })
  await letter.save(function (err, letter) {
    console.log(err, letter)
    if (err) {
      ctx.body = {
        err: err.errmsg
      }
      ctx.response.status = 422
    } else {
      ctx.body = omit(letter.toObject(), ['_id', '__v'])
    }
  }).catch((err) => {
    console.log(err.errmsg)
  })
}

export let RemoveFriend = async (ctx) => {

}