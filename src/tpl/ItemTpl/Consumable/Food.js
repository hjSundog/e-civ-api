// 所有事物类型的模板对象
const MapToObj = require('../../ArrayMapObj')

// 公共部分
const BaseFood = {
  type: 'Consumable',
  flags: ['Salable'],
  restrictions: [],
  details: {
    category: 'Food',
    apply_count: 1
  }
}

const Foods = [{
  ...BaseFood,
  name: 'Gold Apple',
  icon: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1519471427785&di=e70781b51434dba6673f4191716104c3&imgtype=0&src=http%3A%2F%2Fpic35.photophoto.cn%2F20150601%2F0005018349076194_b.png',
  rarity: 'Masterwork',
  vendor_value: 50,
  level: 50,
  effect: {
    health: 80
  },
  description: '金灿灿的苹果，可以回复大量生命值',
  details: {
    ...BaseFood.details,
    description: '食用可恢复100HP',
    recipe: [{
      ingredient: 'Sliver Apple',
      count: 1
    }, {
      ingredient: 'Apple',
      count: 3
    }]
  }
}, {
  ...BaseFood,
  name: 'Sliver Apple',
  icon: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1519471427785&di=e70781b51434dba6673f4191716104c3&imgtype=0&src=http%3A%2F%2Fpic35.photophoto.cn%2F20150601%2F0005018349076194_b.png',
  rarity: 'Fine',
  level: 20,
  vendor_value: 30,
  effect: {
    health: 40
  },
  description: '银闪闪的苹果，可以回复较多生命值',
  details: {
    ...BaseFood.details,
    description: '食用可恢复40HP',
    recipe: [{
      ingredient: 'Apple',
      count: 5
    }],
    ingredient: 'Gold Apple'
  }
}, {
  ...BaseFood,
  name: 'Apple',
  icon: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1519471427785&di=e70781b51434dba6673f4191716104c3&imgtype=0&src=http%3A%2F%2Fpic35.photophoto.cn%2F20150601%2F0005018349076194_b.png',
  rarity: 'Basic',
  level: 5,
  vendor_value: 10,
  effect: {
    health: 10
  },
  description: '红彤彤的苹果，可以回复少量生命值',
  details: {
    ...BaseFood.details,
    description: '食用可恢复10HP',
    ingredient: ['Sliver Apple', 'Gold Apple']
  }
}, {
  ...BaseFood,
  name: 'Bad Apple',
  icon: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1519471427785&di=e70781b51434dba6673f4191716104c3&imgtype=0&src=http%3A%2F%2Fpic35.photophoto.cn%2F20150601%2F0005018349076194_b.png',
  rarity: 'Junk',
  level: 5,
  vendor_value: 1,
  effect: {
    health: 2
  },
  description: '已经搁坏的苹果，回复极少的生命值',
  details: {
    ...BaseFood.details,
    description: '食用可恢复2HP',
    ingredient: []
  }
}]

module.exports = MapToObj(Foods)
