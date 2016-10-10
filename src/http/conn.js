const JSONUtils = require('../json/utils')
const url = require('url')

class Conn {
  constructor(req, res) {
    this.requestParams = {}
    this.__storeRequestData(req)
    this.req = req
    this.res = res
  }

  __storeRequestData(req) {
    if(req && req.url) {
      let parsedUrl = url.parse(req.url, true) // flag indicating node to parse the query as an object
      this.requestPath = parsedUrl.path
      this.addParams(parsedUrl.query)
    }
  }

  hasParam(key) {
    return this.params(key) !== undefined
  }

  // TODO: maybe rename to `param`
  params(key) {
    return JSONUtils.fetch(this.requestParams, key)
  }

  addParams(attrs) {
    this.requestParams = JSONUtils.shallowMerge(this.requestParams, attrs)
  }
}

module.exports = Conn