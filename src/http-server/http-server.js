const Scope        = require('./scope')
const Dispatcher   = require('./dispatcher')
const Conn         = require('./conn')
const httpShutdown = require('http-shutdown')
const http         = require('http')
const JSONUtils    = require('../json/json-utils')

const defaultConfig = {
  gracefulShutdown: true,
  port: 8000,
  host: '0.0.0.0'
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

      // The listen function throws an error if it is unable to bind to the
      // given port, which is properly caught by the promise.
      return this.server.listen(this.config.port, () => {
        // TODO: add log
        resolve()
      })
    })
  }

  requestListener(req, res) {
    let conn = new Conn(req, res)

    return this.dispatcher.dispatch(conn.method, conn.requestPath, conn).then(response => {
      if(JSONUtils.isObject(response)) {
        conn.res.writeHead(200, {
          'Content-Type': 'application/json'
        })
        res.end(JSON.stringify(response))
      }
    }).catch(err => {
      conn.res.writeHead(500, {})
      res.end(err.stack)
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