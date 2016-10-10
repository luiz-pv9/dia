const HTTPServer = require('../../../src/http/http_server')
const HTTPClient = require('../../../src/http_client/http_client')
const expect = require('chai').expect

describe('POST form data', () => {
  let server, scope

  before(() => {
    server = new HTTPServer({ port: 8000 })
    scope = server.defaultScope
    // TODO
  })
})
