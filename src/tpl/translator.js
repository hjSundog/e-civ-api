// 根据模板生成真的数据
// 类似于redux的东西，把所有模板集合起来
const Tpls = require('./ItemTpl')
const Holder = new Map()

const toMapTpl = (tpl, deep) => {
  let cache = Object.entries(tpl)
  for (let i = 0; i < deep; i++) {
    let length = cache.length
    let depths = []
    for (let j = 0; j < length; j++) {
      // 映射
      if (Holder.get(cache[j][0])) {
        throw new Error('有重复的key, 请仔细检查')
      }
      Holder.set(cache[j][0], cache[j][1])
      depths = [...depths, ...Object.entries(cache[j][1])]
    }
    cache = depths
  }
  return Holder
}

module.exports = toMapTpl(Tpls, 3)
