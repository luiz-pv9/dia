const Scope        = require('./scope')
const Dispatcher   = require('./dispatcher')
const Conn         = require('./conn')
const httpShutdown = require('http-shutdown')
const http         = require('http')
const JSONUtils    = require('../json/utils')

const defaultConfig = {
  gracefulShutdown: true,
  port: 8000,
}

class HTTPServer {

  constructor(config = {}) {
    this.config = JSONUtils.shallowMerge(defaultConfig, config)
    this.dispatcher = new Dispatcher()
    this.defaultScope = new Scope(this.dispatcher)
  }

  listen() {
    return new Promise(resolve => {
      this.server = http.createServer(this.requestListener.bind(this))

      if(this.config.gracefulShutdown) {
        httpShutdown(this.server)
      }

      this.server.listen(this.config.port, () => {
        // TODO: add log
        resolve()
      })
    })
  }

  requestListener(req, res) {
    let conn = new Conn(req, res)

    return this.dispatcher.dispatch(req.method, conn.requestPath, conn).then(response => {
      if(JSONUtils.isObject(response)) {
        conn.res.writeHead(200, {
          'Content-Type': 'application/json'
        })
        res.end(JSON.stringify(response))
      }
    })
  }

  close() {
    return new Promise(resolve => {
      let shutdown = this.server.shutdown || this.server.close
      shutdown(() => {
        // TODO: add log
        resolve()
      })
    })
  }
}

module.exports = HTTPServer