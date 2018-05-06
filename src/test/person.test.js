const { expect } = require('chai')
const supertest = require('supertest')
const api = supertest('http://localhost:8800')
let APItoken
/* eslint-disable */

describe('Person', () => {
  before((done) => {
    api.post('/users/login') // 登入測試
      .set('Accept', 'application/json')
      .send({
        username: 'letter',
        password: 'letter'
      })
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err)
        }
        APItoken = res.body.token // 登入成功取得 JWT
        done()
      })
  })

  // it('Get Person test', (done) => {
  //   api.get('/persons/5ad598eea78c451b0c6c0d37')
  //     .set('access-token', APItoken)
  //     .expect(200)
  //     .end((err, res) => {
  //       if (err) {
  //         done(err)
  //       }
  //       expect(res.body).to.have.property('user_id')
  //       expect(res.body.user_id).to.be.a('string')
  //       expect(res.body).to.have.property('avatar')
  //       expect(res.body.avatar).to.be.a('string')
  //       expect(res.body).to.have.property('nickname')
  //       expect(res.body.nickname).to.be.a('string')
  //       expect(res.body).to.have.property('gender')
  //       expect(res.body.gender).to.be.a('string')
  //       expect(res.body).to.have.property('description')
  //       expect(res.body.description).to.be.a('string')
  //       expect(res.body).to.have.property('conditions')
  //       expect(res.body.conditions).to.be.an('object')
  //       expect(res.body).to.have.property('attributes')
  //       expect(res.body.attributes).to.be.an('object')
  //       done()
  //     })
  // })

  // it('Update Person info test', (done) => {
  //   api.get('/persons/5ad598eea78c451b0c6c0d37')
  //     .set('access-token', APItoken)
  //     .expect(200)
  //     .end((err, res) => {
  //       if (err) {
  //         done(err)
  //       }
  //       done()
  //     })
  // })

  // it('Create Person test', (done) => {
  //   api.get('/persons/5ad598eea78c451b0c6c0d37')
  //     .set('access-token', APItoken)
  //     .expect(200)
  //     .end((err, res) => {
  //       if (err) {
  //         done(err)
  //       }
  //       expect(res.body).to.have.property('user_id')
  //       expect(res.body.user_id).to.be.a('string')
  //       expect(res.body).to.have.property('avatar')
  //       expect(res.body.avatar).to.be.a('string')
  //       expect(res.body).to.have.property('nickname')
  //       expect(res.body.nickname).to.be.a('string')
  //       expect(res.body).to.have.property('gender')
  //       expect(res.body.gender).to.be.a('string')
  //       expect(res.body).to.have.property('description')
  //       expect(res.body.description).to.be.a('string')
  //       expect(res.body).to.have.property('conditions')
  //       expect(res.body.conditions).to.be.an('object')
  //       expect(res.body).to.have.property('attributes')
  //       expect(res.body.attributes).to.be.an('object')
  //       done()
  //     })
  // })

  it('Delete Person test', (done) => {
    api.get('/persons/5ae9b2555212963e442872c6')
      .set('access-token', APItoken)
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err)
        }
        done()
      })
  })

  it('Create Item Test', (done) => {
    api.get('/persons/5ae9b2555212963e442872c6')
      .set('access-token', APItoken)
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err)
        }
        expect(res.body).to.have.property('user_id')
        expect(res.body.user_id).to.be.a('string')
        expect(res.body).to.have.property('avatar')
        expect(res.body.avatar).to.be.a('string')
        expect(res.body).to.have.property('nickname')
        expect(res.body.nickname).to.be.a('string')
        expect(res.body).to.have.property('gender')
        expect(res.body.gender).to.be.a('string')
        expect(res.body).to.have.property('description')
        expect(res.body.description).to.be.a('string')
        expect(res.body).to.have.property('conditions')
        expect(res.body.conditions).to.be.an('object')
        expect(res.body).to.have.property('attributes')
        expect(res.body.attributes).to.be.an('object')
        done()
      })
  })

  it('get Person All Items test', (done) => {
    api.get('/persons/5ae9b2555212963e442872c6')
      .set('access-token', APItoken)
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err)
        }
        expect(res.body).to.have.property('user_id')
        expect(res.body.user_id).to.be.a('string')
        expect(res.body).to.have.property('avatar')
        expect(res.body.avatar).to.be.a('string')
        expect(res.body).to.have.property('nickname')
        expect(res.body.nickname).to.be.a('string')
        expect(res.body).to.have.property('gender')
        expect(res.body.gender).to.be.a('string')
        expect(res.body).to.have.property('description')
        expect(res.body.description).to.be.a('string')
        expect(res.body).to.have.property('conditions')
        expect(res.body.conditions).to.be.an('object')
        expect(res.body).to.have.property('attributes')
        expect(res.body.attributes).to.be.an('object')
        done()
      })
  })

  it('Get Person Item test', (done) => {
    api.get('/persons/5ae9b2555212963e442872c6')
      .set('access-token', APItoken)
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err)
        }
        expect(res.body).to.have.property('user_id')
        expect(res.body.user_id).to.be.a('string')
        expect(res.body).to.have.property('avatar')
        expect(res.body.avatar).to.be.a('string')
        expect(res.body).to.have.property('nickname')
        expect(res.body.nickname).to.be.a('string')
        expect(res.body).to.have.property('gender')
        expect(res.body.gender).to.be.a('string')
        expect(res.body).to.have.property('description')
        expect(res.body.description).to.be.a('string')
        expect(res.body).to.have.property('conditions')
        expect(res.body.conditions).to.be.an('object')
        expect(res.body).to.have.property('attributes')
        expect(res.body.attributes).to.be.an('object')
        done()
      })
  })

  it('Get Person Items of category test', (done) => {
    api.get('/persons/5ae9b2555212963e442872c6')
      .set('access-token', APItoken)
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err)
        }
        expect(res.body).to.have.property('user_id')
        expect(res.body.user_id).to.be.a('string')
        expect(res.body).to.have.property('avatar')
        expect(res.body.avatar).to.be.a('string')
        expect(res.body).to.have.property('nickname')
        expect(res.body.nickname).to.be.a('string')
        expect(res.body).to.have.property('gender')
        expect(res.body.gender).to.be.a('string')
        expect(res.body).to.have.property('description')
        expect(res.body.description).to.be.a('string')
        expect(res.body).to.have.property('conditions')
        expect(res.body.conditions).to.be.an('object')
        expect(res.body).to.have.property('attributes')
        expect(res.body.attributes).to.be.an('object')
        done()
      })
  })

  it('Use Item test', (done) => {
    api.get('/persons/5ae9b2555212963e442872c6')
      .set('access-token', APItoken)
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err)
        }

        expect(res.body).to.have.property('user_id')
        expect(res.body.user_id).to.be.a('string')
        expect(res.body).to.have.property('avatar')
        expect(res.body.avatar).to.be.a('string')
        expect(res.body).to.have.property('nickname')
        expect(res.body.nickname).to.be.a('string')
        expect(res.body).to.have.property('gender')
        expect(res.body.gender).to.be.a('string')
        expect(res.body).to.have.property('description')
        expect(res.body.description).to.be.a('string')
        expect(res.body).to.have.property('conditions')
        expect(res.body.conditions).to.be.an('object')
        expect(res.body).to.have.property('attributes')
        expect(res.body.attributes).to.be.an('object')
        done()
      })
  })
})

describe('User', () => {
  before((done) => {
    api.post('/users/login') // 登入測試
      .set('Accept', 'application/json')
      .send({
        username: 'letter',
        password: 'letter'
      })
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err)
        }
        APItoken = res.body.token // 登入成功取得 JWT
        done()
      })
  })

  it('Delete User test', (done) => {
    api.get('/persons/5ae9b2555212963e442872c6')
      .set('access-token', APItoken)
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err)
        }
        done()
      })
  })



  it('Signup', (done) => {
    api.get('/persons/5ae9b2555212963e442872c6')
      .set('access-token', APItoken)
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err)
        }

        expect(res.body).to.have.property('user_id')
        expect(res.body.user_id).to.be.a('string')
        expect(res.body).to.have.property('avatar')
        expect(res.body.avatar).to.be.a('string')
        expect(res.body).to.have.property('nickname')
        expect(res.body.nickname).to.be.a('string')
        expect(res.body).to.have.property('gender')
        expect(res.body.gender).to.be.a('string')
        expect(res.body).to.have.property('description')
        expect(res.body.description).to.be.a('string')
        expect(res.body).to.have.property('conditions')
        expect(res.body.conditions).to.be.an('object')
        expect(res.body).to.have.property('attributes')
        expect(res.body.attributes).to.be.an('object')
        done()
      })
  })
})

describe('Letter', () => {
  before((done) => {
    api.post('/users/login') // 登入測試
      .set('Accept', 'application/json')
      .send({
        username: 'letter',
        password: 'letter'
      })
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err)
        }
        APItoken = res.body.token // 登入成功取得 JWT
        done()
      })
  })


  it('Write', (done) => {
    api.get('/persons/5ae9b2555212963e442872c6')
      .set('access-token', APItoken)
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err)
        }
        done()
      })
  })

  it('Read list', (done) => {
    api.get('/persons/5ae9b2555212963e442872c6')
      .set('access-token', APItoken)
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err)
        }
        expect(res.body).to.have.property('user_id')
        expect(res.body.user_id).to.be.a('string')
        expect(res.body).to.have.property('avatar')
        expect(res.body.avatar).to.be.a('string')
        expect(res.body).to.have.property('nickname')
        expect(res.body.nickname).to.be.a('string')
        expect(res.body).to.have.property('gender')
        expect(res.body.gender).to.be.a('string')
        expect(res.body).to.have.property('description')
        expect(res.body.description).to.be.a('string')
        expect(res.body).to.have.property('conditions')
        expect(res.body.conditions).to.be.an('object')
        expect(res.body).to.have.property('attributes')
        expect(res.body.attributes).to.be.an('object')
        done()
      })
  })

  it('get letter', (done) => {
    api.get('/persons/5ae9b2555212963e442872c6')
      .set('access-token', APItoken)
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err)
        }
        expect(res.body).to.have.property('user_id')
        expect(res.body.user_id).to.be.a('string')
        expect(res.body).to.have.property('avatar')
        expect(res.body.avatar).to.be.a('string')
        expect(res.body).to.have.property('nickname')
        expect(res.body.nickname).to.be.a('string')
        expect(res.body).to.have.property('gender')
        expect(res.body.gender).to.be.a('string')
        expect(res.body).to.have.property('description')
        expect(res.body.description).to.be.a('string')
        expect(res.body).to.have.property('conditions')
        expect(res.body.conditions).to.be.an('object')
        expect(res.body).to.have.property('attributes')
        expect(res.body.attributes).to.be.an('object')
        done()
      })
  })

  it('get conversation', (done) => {
    api.get('/persons/5ae9b2555212963e442872c6')
      .set('access-token', APItoken)
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err)
        }
        expect(res.body).to.have.property('user_id')
        expect(res.body.user_id).to.be.a('string')
        expect(res.body).to.have.property('avatar')
        expect(res.body.avatar).to.be.a('string')
        expect(res.body).to.have.property('nickname')
        expect(res.body.nickname).to.be.a('string')
        expect(res.body).to.have.property('gender')
        expect(res.body.gender).to.be.a('string')
        expect(res.body).to.have.property('description')
        expect(res.body.description).to.be.a('string')
        expect(res.body).to.have.property('conditions')
        expect(res.body.conditions).to.be.an('object')
        expect(res.body).to.have.property('attributes')
        expect(res.body.attributes).to.be.an('object')
        done()
      })
  })
})
describe('Item', () => {
  before((done) => {
    done()
  })
  it('get item', (done) => {
    done()
  })

  it('use item', (done) => {
    done()
  })
})
describe('Item', () => {
  before((done) => {
    done()
  })
  it('get item', (done) => {
    done()
  })

  it('use item', (done) => {
    done()
  })
})
describe('Item', () => {
  before((done) => {
    done()
  })
  it('get item', (done) => {
    done()
  })

  it('use item', (done) => {
    done()
  })
})
describe('Item', () => {
  before((done) => {
    done()
  })
  it('get item', (done) => {
    done()
  })

  it('use item', (done) => {
    done()
  })
})
describe('Item', () => {
  before((done) => {
    done()
  })
  it('get item', (done) => {
    done()
  })

  it('use item', (done) => {
    done()
  })
})
describe('Item', () => {
  before((done) => {
    done()
  })
  it('get item', (done) => {
    done()
  })

  it('use item', (done) => {
    done()
  })
})
describe('Item', () => {
  before((done) => {
    done()
  })
  it('get item', (done) => {
    done()
  })

  it('use item', (done) => {
    done()
  })
})
describe('Item', () => {
  before((done) => {
    done()
  })
  it('get item', (done) => {
    done()
  })

  it('use item', (done) => {
    done()
  })
})
describe('Item', () => {
  before((done) => {
    done()
  })
  it('get item', (done) => {
    done()
  })

  it('use item', (done) => {
    done()
  })
})
describe('Item', () => {
  before((done) => {
    done()
  })
  it('get item', (done) => {
    done()
  })

  it('use item', (done) => {
    done()
  })
})
describe('Item', () => {
  before((done) => {
    done()
  })
  it('get item', (done) => {
    done()
  })

  it('use item', (done) => {
    done()
  })
})
describe('Item', () => {
  before((done) => {
    done()
  })
  it('get item', (done) => {
    done()
  })

  it('use item', (done) => {
    done()
  })
})
describe('Item', () => {
  before((done) => {
    done()
  })
  it('get item', (done) => {
    done()
  })

  it('use item', (done) => {
    done()
  })
})
describe('Item', () => {
  before((done) => {
    done()
  })
  it('get item', (done) => {
    done()
  })

  it('use item', (done) => {
    done()
  })
})


describe('Map', () => {
  before((done) => {
    api.post('/users/login') // 登入測試
      .set('Accept', 'application/json')
      .send({
        username: 'letter',
        password: 'letter'
      })
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err)
        }
        APItoken = res.body.token // 登入成功取得 JWT
        done()
      })
  })


  it('get nearby positions', (done) => {
    api.get('/persons/5ae9b2555212963e442872c6')
      .set('access-token', APItoken)
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err)
        }
        done()
      })
  })

  it('get position', (done) => {
    api.get('/persons/5ae9b2555212963e442872c6')
      .set('access-token', APItoken)
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err)
        }
        expect(res.body).to.have.property('user_id')
        expect(res.body.user_id).to.be.a('string')
        expect(res.body).to.have.property('avatar')
        expect(res.body.avatar).to.be.a('string')
        expect(res.body).to.have.property('nickname')
        expect(res.body.nickname).to.be.a('string')
        expect(res.body).to.have.property('gender')
        expect(res.body.gender).to.be.a('string')
        expect(res.body).to.have.property('description')
        expect(res.body.description).to.be.a('string')
        expect(res.body).to.have.property('conditions')
        expect(res.body.conditions).to.be.an('object')
        expect(res.body).to.have.property('attributes')
        expect(res.body.attributes).to.be.an('object')
        done() 

})


describe('Item', () => {
  before((done) => {
    done()
  })
  it('get item', (done) => {
    done()
  })

  it('use item', (done) => {
    done()
  })
})

describe('Skill', () => {
  before((done) => {
    done()
  })
  it('get skill', (done) => {
    done()
  })

  it('use skill', (done) => {
    done()
  })
  it('get all skill list', (done) => {
    done()
  })
})



describe('Person', () => {
  before((done) => {
    api.post('/users/login') // 登入測試
      .set('Accept', 'application/json')
      .send({
        username: 'letter',
        password: 'letter'
      })
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err)
        }
        APItoken = res.body.token // 登入成功取得 JWT
        done()
      })
  })

  // it('Get Person test', (done) => {
  //   api.get('/persons/5ad598eea78c451b0c6c0d37')
  //     .set('access-token', APItoken)
  //     .expect(200)
  //     .end((err, res) => {
  //       if (err) {
  //         done(err)
  //       }
  //       expect(res.body).to.have.property('user_id')
  //       expect(res.body.user_id).to.be.a('string')
  //       expect(res.body).to.have.property('avatar')
  //       expect(res.body.avatar).to.be.a('string')
  //       expect(res.body).to.have.property('nickname')
  //       expect(res.body.nickname).to.be.a('string')
  //       expect(res.body).to.have.property('gender')
  //       expect(res.body.gender).to.be.a('string')
  //       expect(res.body).to.have.property('description')
  //       expect(res.body.description).to.be.a('string')
  //       expect(res.body).to.have.property('conditions')
  //       expect(res.body.conditions).to.be.an('object')
  //       expect(res.body).to.have.property('attributes')
  //       expect(res.body.attributes).to.be.an('object')
  //       done()
  //     })
  // })

  // it('Update Person info test', (done) => {
  //   api.get('/persons/5ad598eea78c451b0c6c0d37')
  //     .set('access-token', APItoken)
  //     .expect(200)
  //     .end((err, res) => {
  //       if (err) {
  //         done(err)
  //       }
  //       done()
  //     })
  // })

  // it('Create Person test', (done) => {
  //   api.get('/persons/5ad598eea78c451b0c6c0d37')
  //     .set('access-token', APItoken)
  //     .expect(200)
  //     .end((err, res) => {
  //       if (err) {
  //         done(err)
  //       }
  //       expect(res.body).to.have.property('user_id')
  //       expect(res.body.user_id).to.be.a('string')
  //       expect(res.body).to.have.property('avatar')
  //       expect(res.body.avatar).to.be.a('string')
  //       expect(res.body).to.have.property('nickname')
  //       expect(res.body.nickname).to.be.a('string')
  //       expect(res.body).to.have.property('gender')
  //       expect(res.body.gender).to.be.a('string')
  //       expect(res.body).to.have.property('description')
  //       expect(res.body.description).to.be.a('string')
  //       expect(res.body).to.have.property('conditions')
  //       expect(res.body.conditions).to.be.an('object')
  //       expect(res.body).to.have.property('attributes')
  //       expect(res.body.attributes).to.be.an('object')
  //       done()
  //     })
  // })

  it('Delete Person test', (done) => {
    api.get('/persons/5ae9b2555212963e442872c6')
      .set('access-token', APItoken)
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err)
        }
        done()
      })
  })

  it('Create Item Test', (done) => {
    api.get('/persons/5ae9b2555212963e442872c6')
      .set('access-token', APItoken)
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err)
        }
        expect(res.body).to.have.property('user_id')
        expect(res.body.user_id).to.be.a('string')
        expect(res.body).to.have.property('avatar')
        expect(res.body.avatar).to.be.a('string')
        expect(res.body).to.have.property('nickname')
        expect(res.body.nickname).to.be.a('string')
        expect(res.body).to.have.property('gender')
        expect(res.body.gender).to.be.a('string')
        expect(res.body).to.have.property('description')
        expect(res.body.description).to.be.a('string')
        expect(res.body).to.have.property('conditions')
        expect(res.body.conditions).to.be.an('object')
        expect(res.body).to.have.property('attributes')
        expect(res.body.attributes).to.be.an('object')
        done()
      })
  })

  it('get Person All Items test', (done) => {
    api.get('/persons/5ae9b2555212963e442872c6')
      .set('access-token', APItoken)
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err)
        }
        expect(res.body).to.have.property('user_id')
        expect(res.body.user_id).to.be.a('string')
        expect(res.body).to.have.property('avatar')
        expect(res.body.avatar).to.be.a('string')
        expect(res.body).to.have.property('nickname')
        expect(res.body.nickname).to.be.a('string')
        expect(res.body).to.have.property('gender')
        expect(res.body.gender).to.be.a('string')
        expect(res.body).to.have.property('description')
        expect(res.body.description).to.be.a('string')
        expect(res.body).to.have.property('conditions')
        expect(res.body.conditions).to.be.an('object')
        expect(res.body).to.have.property('attributes')
        expect(res.body.attributes).to.be.an('object')
        done()
      })
  })

  it('Get Person Item test', (done) => {
    api.get('/persons/5ae9b2555212963e442872c6')
      .set('access-token', APItoken)
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err)
        }
        expect(res.body).to.have.property('user_id')
        expect(res.body.user_id).to.be.a('string')
        expect(res.body).to.have.property('avatar')
        expect(res.body.avatar).to.be.a('string')
        expect(res.body).to.have.property('nickname')
        expect(res.body.nickname).to.be.a('string')
        expect(res.body).to.have.property('gender')
        expect(res.body.gender).to.be.a('string')
        expect(res.body).to.have.property('description')
        expect(res.body.description).to.be.a('string')
        expect(res.body).to.have.property('conditions')
        expect(res.body.conditions).to.be.an('object')
        expect(res.body).to.have.property('attributes')
        expect(res.body.attributes).to.be.an('object')
        done()
      })
  })

  it('Get Person Items of category test', (done) => {
    api.get('/persons/5ae9b2555212963e442872c6')
      .set('access-token', APItoken)
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err)
        }
        expect(res.body).to.have.property('user_id')
        expect(res.body.user_id).to.be.a('string')
        expect(res.body).to.have.property('avatar')
        expect(res.body.avatar).to.be.a('string')
        expect(res.body).to.have.property('nickname')
        expect(res.body.nickname).to.be.a('string')
        expect(res.body).to.have.property('gender')
        expect(res.body.gender).to.be.a('string')
        expect(res.body).to.have.property('description')
        expect(res.body.description).to.be.a('string')
        expect(res.body).to.have.property('conditions')
        expect(res.body.conditions).to.be.an('object')
        expect(res.body).to.have.property('attributes')
        expect(res.body.attributes).to.be.an('object')
        done()
      })
  })

  it('Use Item test', (done) => {
    api.get('/persons/5ae9b2555212963e442872c6')
      .set('access-token', APItoken)
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err)
        }

        expect(res.body).to.have.property('user_id')
        expect(res.body.user_id).to.be.a('string')
        expect(res.body).to.have.property('avatar')
        expect(res.body.avatar).to.be.a('string')
        expect(res.body).to.have.property('nickname')
        expect(res.body.nickname).to.be.a('string')
        expect(res.body).to.have.property('gender')
        expect(res.body.gender).to.be.a('string')
        expect(res.body).to.have.property('description')
        expect(res.body.description).to.be.a('string')
        expect(res.body).to.have.property('conditions')
        expect(res.body.conditions).to.be.an('object')
        expect(res.body).to.have.property('attributes')
        expect(res.body.attributes).to.be.an('object')
        done()
      })
  })
})

describe('User', () => {
  before((done) => {
    api.post('/users/login') // 登入測試
      .set('Accept', 'application/json')
      .send({
        username: 'letter',
        password: 'letter'
      })
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err)
        }
        APItoken = res.body.token // 登入成功取得 JWT
        done()
      })
  })

  it('Delete User test', (done) => {
    api.get('/persons/5ae9b2555212963e442872c6')
      .set('access-token', APItoken)
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err)
        }
        done()
      })
  })



  it('Signup', (done) => {
    api.get('/persons/5ae9b2555212963e442872c6')
      .set('access-token', APItoken)
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err)
        }

        expect(res.body).to.have.property('user_id')
        expect(res.body.user_id).to.be.a('string')
        expect(res.body).to.have.property('avatar')
        expect(res.body.avatar).to.be.a('string')
        expect(res.body).to.have.property('nickname')
        expect(res.body.nickname).to.be.a('string')
        expect(res.body).to.have.property('gender')
        expect(res.body.gender).to.be.a('string')
        expect(res.body).to.have.property('description')
        expect(res.body.description).to.be.a('string')
        expect(res.body).to.have.property('conditions')
        expect(res.body.conditions).to.be.an('object')
        expect(res.body).to.have.property('attributes')
        expect(res.body.attributes).to.be.an('object')
        done()
      })
  })
})

describe('Letter', () => {
  before((done) => {
    api.post('/users/login') // 登入測試
      .set('Accept', 'application/json')
      .send({
        username: 'letter',
        password: 'letter'
      })
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err)
        }
        APItoken = res.body.token // 登入成功取得 JWT
        done()
      })
  })


  it('Write', (done) => {
    api.get('/persons/5ae9b2555212963e442872c6')
      .set('access-token', APItoken)
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err)
        }
        done()
      })
  })

  it('Read list', (done) => {
    api.get('/persons/5ae9b2555212963e442872c6')
      .set('access-token', APItoken)
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err)
        }
        expect(res.body).to.have.property('user_id')
        expect(res.body.user_id).to.be.a('string')
        expect(res.body).to.have.property('avatar')
        expect(res.body.avatar).to.be.a('string')
        expect(res.body).to.have.property('nickname')
        expect(res.body.nickname).to.be.a('string')
        expect(res.body).to.have.property('gender')
        expect(res.body.gender).to.be.a('string')
        expect(res.body).to.have.property('description')
        expect(res.body.description).to.be.a('string')
        expect(res.body).to.have.property('conditions')
        expect(res.body.conditions).to.be.an('object')
        expect(res.body).to.have.property('attributes')
        expect(res.body.attributes).to.be.an('object')
        done()
      })
  })

  it('get letter', (done) => {
    api.get('/persons/5ae9b2555212963e442872c6')
      .set('access-token', APItoken)
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err)
        }
        expect(res.body).to.have.property('user_id')
        expect(res.body.user_id).to.be.a('string')
        expect(res.body).to.have.property('avatar')
        expect(res.body.avatar).to.be.a('string')
        expect(res.body).to.have.property('nickname')
        expect(res.body.nickname).to.be.a('string')
        expect(res.body).to.have.property('gender')
        expect(res.body.gender).to.be.a('string')
        expect(res.body).to.have.property('description')
        expect(res.body.description).to.be.a('string')
        expect(res.body).to.have.property('conditions')
        expect(res.body.conditions).to.be.an('object')
        expect(res.body).to.have.property('attributes')
        expect(res.body.attributes).to.be.an('object')
        done()
      })
  })

  it('get conversation', (done) => {
    api.get('/persons/5ae9b2555212963e442872c6')
      .set('access-token', APItoken)
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err)
        }
        expect(res.body).to.have.property('user_id')
        expect(res.body.user_id).to.be.a('string')
        expect(res.body).to.have.property('avatar')
        expect(res.body.avatar).to.be.a('string')
        expect(res.body).to.have.property('nickname')
        expect(res.body.nickname).to.be.a('string')
        expect(res.body).to.have.property('gender')
        expect(res.body.gender).to.be.a('string')
        expect(res.body).to.have.property('description')
        expect(res.body.description).to.be.a('string')
        expect(res.body).to.have.property('conditions')
        expect(res.body.conditions).to.be.an('object')
        expect(res.body).to.have.property('attributes')
        expect(res.body.attributes).to.be.an('object')
        done()
      })
  })
})

describe('Map', () => {
  before((done) => {
    api.post('/users/login') // 登入測試
      .set('Accept', 'application/json')
      .send({
        username: 'letter',
        password: 'letter'
      })
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err)
        }
        APItoken = res.body.token // 登入成功取得 JWT
        done()
      })
  })


  it('get nearby positions', (done) => {
    api.get('/persons/5ae9b2555212963e442872c6')
      .set('access-token', APItoken)
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err)
        }
        done()
      })
  })

  it('get position', (done) => {
    api.get('/persons/5ae9b2555212963e442872c6')
      .set('access-token', APItoken)
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err)
        }
        expect(res.body).to.have.property('user_id')
        expect(res.body.user_id).to.be.a('string')
        expect(res.body).to.have.property('avatar')
        expect(res.body.avatar).to.be.a('string')
        expect(res.body).to.have.property('nickname')
        expect(res.body.nickname).to.be.a('string')
        expect(res.body).to.have.property('gender')
        expect(res.body.gender).to.be.a('string')
        expect(res.body).to.have.property('description')
        expect(res.body.description).to.be.a('string')
        expect(res.body).to.have.property('conditions')
        expect(res.body.conditions).to.be.an('object')
        expect(res.body).to.have.property('attributes')
        expect(res.body.attributes).to.be.an('object')
        done()
      })
  })

})

