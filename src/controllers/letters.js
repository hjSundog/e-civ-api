import omit from '../lib/omit'
import Letter from '../models/letter'

export let GetByOwn = async (ctx) => {
  // 验证jwt，解析userID或者其他

  await Letter.find()
    // .equals() 只获取自己的letter
    .select({ title: 1, content: 1, create_time: 1 })
    .sort({create_time: 'asc'})
    .exec((err, letterDocs) => {
      if (err) {
        throw new Error(err.toString())
      }
      ctx.body = [
        ...letterDocs.map(letter => {
          return omit(letter.toObject(), ['_id'])
        })
      ]
    })
}

export let Post = async (ctx) => {
  const data = ctx.request.body
  // TODO: 补全userid部分
  var letter = new Letter({
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
