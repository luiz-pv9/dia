const JSONUtils = require('../json/json-utils')
const url = require('url')
const querystring = require('querystring')

class Conn {
  constructor(req, res) {
    this.requestParams = {}
    this.__storeRequestData(req)
    this.req = req
    this.res = res
  }

  __storeRequestData(req) {
    if(req && req.url) {
      this.method = req.method

      // TODO: extract this to own pipeline
      let parsedUrl = url.parse(req.url, true)
      this.requestPath = parsedUrl.path
      this.addParams(parsedUrl.query)
    }
  }

  accepts(format) {
    throw new Error("not implemented")
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