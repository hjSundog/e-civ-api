module.exports = function () {
  return function (ctx, next) {
    // console.log(ctx)
    switch (ctx.status) {
    case 404:
      ctx.body = '没有找到内容 - 404'
      break
    }
    return next()
  }
}
