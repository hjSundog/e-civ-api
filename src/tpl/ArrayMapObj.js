module.exports = (arr) => {
  return arr.reduce((rt, a) => {
    if (a['name']) {
      rt[a['name']] = JSON.parse(JSON.stringify(a))
      return rt
    } else {
      throw new Error('you need to pass the object with parameter [name] in ' + a)
    }
  }, {})
}
