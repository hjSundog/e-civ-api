const Building = require('../models/building')
const omit = require('../lib/omit')
const authInterceptor = require('../tool/Auth').authInterceptor

const handleError = (err) => {
  console.log(err)
}

// 创建建筑物
const CreateBuilding = async (ctx) => {
  let data, type
  if (!authInterceptor(ctx)) {
    return
  }
  type = ctx.params.type
  if (!type) {
    ctx.response.status = 422
    ctx.body = {
      err: 'No Post Param'
    }
    return
  }
  try {
    data = ctx.request.body
  } catch (e) {
    handleError(e)
  }
  // building 完整信息
  const {lat, lon, name} = data
  const building = await new Building({
    holder: ctx.header.authorization.decoded['person_id'],
    type: type,
    size: {
      scaleX: 1,
      scaleY: 1
    },
    name: name,
    position: {
      lat, lon
    },
    level: 1,
    resource: []
  }).save((err, building) => {
    if (err) {
      throw new Error(err)
    }
  })
  ctx.body = building.linkTpl()
}

// 获取自己占据建筑物列表
const GetPersonBuildings = async (ctx) => {
  if (!authInterceptor(ctx)) {
    return
  }
  await Building.findOne()
    .where('holder').equals(ctx.header.authorization.decoded.person_id)
    .exec((err, buildingDoc) => {
      if (err) {
        handleError(err)
      }
      if (!buildingDoc) {
        ctx.response.status = 404
        ctx.body = {
          err: 'No Buildings'
        }
        return
      }
      ctx.body = buildingDoc.map(building => {
        return building.linkTpl()
      })
    })
}

// 获取所以建筑物列表
const GetAllBuildings = async (ctx) => {
  if (!authInterceptor(ctx)) {
    return
  }
  await Building.find()
    .exec((err, buildingDoc) => {
      if (err) {
        handleError(err)
      }
      if (!buildingDoc) {
        ctx.response.status = 404
        ctx.body = {
          err: 'No Buildings'
        }
        return
      }
      ctx.body = buildingDoc.map(building => {
        // return omit({
        //   ...building.toObject()
        // }, ['_id', '__v'])
        return building.linkTpl()
      })
    })
}

// 获取某种类型的建筑物
const GetTypeOfBuilding = async (ctx) => {
  if (!authInterceptor(ctx)) {
    return
  }
  if (!ctx.query.type) {
    ctx.response.status = 422
    ctx.body = {
      err: 'No Search Param'
    }
    return
  }
  let data
  try {
    data = ctx.query.type
  } catch (e) {
    handleError(e)
  }
}
// 根据id获取建筑物
const GetById = async (ctx) => {
  if (!authInterceptor(ctx)) {
    return
  }
  if (!ctx.params.id) {
    ctx.response.status = 422
    ctx.body = {
      err: 'No Query Param'
    }
    return
  }
  let data
  try {
    data = ctx.params.id
  } catch (e) {
    handleError(e)
  }
}

module.exports = {
  CreateBuilding,
  GetById,
  GetTypeOfBuilding,
  GetAllBuildings,
  GetPersonBuildings
}
