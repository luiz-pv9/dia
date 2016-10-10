const request = require('request')
const querystring = require('querystring')
const url = require('url')
const JSONUtils = require('../json/utils')

// `Request` in the function's name getRequestResponse refers to the library's 
// name, not a generic request. If the library was named Foo, this function
// would be called generateFooResponse.
// 
// It is important to keep this distinction because live's HTTPClient is just
// a wrapper around Request - which we can replace in the future and maybe
// extract to an adapter pattern.
function generateRequestResponse({ response, body }) {
  let contentType = response.headers['content-type']
  if(contentType && contentType.match(/json/)) {

    // If JSON.parse fails the promise returned from the request will reject,
    // so nothing to worry here.
    body = JSON.parse(body)
  }

  return {
    statusCode: response.statusCode,
    statusMessage: response.statusMessage,
    headers: response.headers,
    body: body
  }
}

class HTTPClient {

  static params(obj) {
    return querystring.stringify(obj)
  }

  static request(method, uri, opts = {}) {
    return new Promise((resolve, reject) => {
      let requestOpts = { method, uri }
      if(opts.data && method !== 'get') {
        requestOpts.formData = opts.data
      }
      request(requestOpts, function (error, response, body) {
        if (error) {
          return reject(error)
        }
        resolve(generateRequestResponse({ response, body }))
      })
    })
  }

  static get(url, opts = {}) {
    return HTTPClient.request('get', url, opts)
  }

  static post(url, data, opts = {}) {
    opts = JSONUtils.shallowMerge(opts, { data })
    return HTTPClient.request('post', url, opts)
  }
}

module.exports = HTTPClient