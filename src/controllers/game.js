// const GameScene = require('e-civ-game')
const fs = require('fs')
const path = require('path')
const ffmpeg = require('fluent-ffmpeg')
const send = require('koa-send')
const authInterceptor = require('../tool/Auth').authInterceptor
const mkdirp = require('mkdirp')
// 根目录
const baseUrl = '../../'
const VideoUrl = 'videos'
const ImageUrl = 'images'
// 路径解析
function pathResolve (file) {
  return path.resolve(__dirname, baseUrl, file)
}

function decodeBase64Image (dataString) {
  if (typeof dataString.match !== 'function') {
    console.log('mi')
  }
  var matches = dataString.match(/^data:image\/([A-Za-z-+\/]+);base64,(.+)$/)
  var response = {}
  if (matches.length !== 3) {
    return new Error('Invalid input string')
  }
  response.type = matches[1]
  response.data = Buffer.from(matches[2], 'base64')
  return response
}

// 将帧数据转为图片
async function generatePngs (frames, url) {
  return Promise.all(frames.map(function (value, index) {
    var img = decodeBase64Image(value)
    var data = img.data
    var type = img.type
    return new Promise(function (resolve, reject) {
      fs.writeFile(pathResolve(url + '/img' + index + '.' + type), data, 'base64', function (err) {
        if (err) {
          reject(err)
        } else {
          resolve()
        }
      })
    })
  }))
}
// 转图片为视频
async function generateVideo (target, dest, timeStamp, params, fps = 8) {
  const {user, enemy} = params
  let rt
  await new Promise((resolve, reject) => {
    ffmpeg({
      source: pathResolve(target + '/img%d.png'),
      nolog: true
    }).inputFPS(fps)
      .videoBitrate(1024)
      .format('mp4')
      .saveToFile(pathResolve(dest + '/game' + timeStamp + '.mp4'), (retcode, err) => {
        if (err) {
          console.log(err)
        }
      })
      .on('end', function () {
        rt = {
          url: `games/${user}@@${enemy}/${timeStamp}`,
          filename: 'game' + timeStamp + '.mp4',
          folder: `${user}@@${enemy}`
        }
        resolve()
      })
      .on('error', function (err) {
        console.log('ERR: ' + err.message)
        reject(err)
      })
  })
  return rt
}

const PostGame = async (ctx) => {
  if (!authInterceptor(ctx)) {
    return
  }
  let rt
  const data = ctx.request.body
  const {frames, target, user} = data
  const timeStamp = Date.now()
  const folder = `${ImageUrl}/${user}@@${target}/${timeStamp}`
  const videoFolder = `${VideoUrl}/${user}@@${target}`
  // 创建文件夹
  if (!fs.existsSync(pathResolve(folder))) {
    mkdirp.sync(pathResolve(folder))
  }

  if (!fs.existsSync(pathResolve(videoFolder))) {
    mkdirp.sync(pathResolve(videoFolder))
  }
  // 图片
  await generatePngs(frames, folder)
  // 视频
  rt = await generateVideo(folder, videoFolder, timeStamp, {
    user: user,
    enemy: target
  })

  ctx.body = rt
}

const GetGame = async ctx => {
  if (!ctx.params.timeStamp || !ctx.params.folder) {
    ctx.response.status = 422
    ctx.body = {
      err: 'No Query Param'
    }
    return
  }

  const {timeStamp, folder} = ctx.params
  const fileName = path.join(VideoUrl, folder, '/game' + timeStamp + '.mp4')
  ctx.attachment(fileName)
  await send(ctx, fileName, {
    root: pathResolve('')
  })
}

const PlayGame = async ctx => {
  if (!ctx.params.folder || !ctx.params.file) {
    ctx.response.status = 422
    ctx.body = {
      err: 'No Query Param'
    }
    return
  }
  const {file, folder} = ctx.params
  ctx.type = 'video/mp4'
  const fileName = pathResolve(path.join(VideoUrl, folder, file))
  const rs = fs.createReadStream(fileName)
  ctx.body = rs
  // rs.on('end', (err) => {
  //   if (err) {
  //     console.log(err)
  //     return
  //   }
  //   console.log('end pipe')
  //   rs.end()
  // })
  // res.contentType('mpeg');
  // var rstream = fs.createReadStream(fileName)
  // rstream.pipe(res, {end: true});
}

module.exports = {
  PostGame,
  GetGame,
  PlayGame
}
