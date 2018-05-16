const Buildings = {
  type: 'Farm',
  name: '田地',
  icon: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3354766918,3321944134&fm=200&gp=0.jpg',
  description: '肥沃的农田，你可以种植你想要的作物！',
  actions: [{
    operation: 'upgrade',
    name: '升级',
    need: [{
      name: 'Gold',
      count: 100
    }, {
      name: 'Wood',
      count: 100
    }],
    stamina: 5,
    duration: 60
  }, {
    operation: ''
  }, {
    operation: 'plant',
    name: '种植',
    need: [{
      name: 'Gold',
      count: 200
    }],
    stamina: 5,
    duration: 120
  }]
}

module.exports = Buildings
