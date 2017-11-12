export let GetByName = (ctx) => {
  ctx.body = {
    result: 'get',
    name: ctx.params.name
  }
}

export let Post = async (ctx) => {
  ctx.body = {
    result: 'post',
    name: ctx.params.name,
    para: ctx.request.body
  }
}
