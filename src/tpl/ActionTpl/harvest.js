module.exports = {
  name: '收获',
  operation: 'harvest',
  duration: 180,
  stamina: 6,
  description: '丰收的时候到了， 收获你的劳作成果吧!',
  results: [{
    name: 'Wheat',
    count: 100
  }, {
    name: 'Gold',
    count: 1500
  }],
  needs: [{
    name: 'Gold',
    count: 500
  }]
}
