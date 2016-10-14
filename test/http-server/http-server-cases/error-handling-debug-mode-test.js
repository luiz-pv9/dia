const HTTPServer = require('../../../src/http-server/http-server')
const HTTPClient = require('../../../src/http-client/http-client')
const expect = require('chai').expect

describe('HTTP server error handling', () => {
  let server

  before(() => {
    server = new HTTPServer({ port: 8000 })

    server.defaultScope.get('home', conn => {
      let name = "Mr. Potter"
      return name.nonExistingFunction() // common "undefined" is not a function
    })

    return server.listen()
  })

  after(() => {
    return server.close()
  })


  it('returns 500 with the error description', () => {
    return HTTPClient.get('http://localhost:8000/home').then(res => {
      expect(res.statusCode).to.eq(500)
      expect(res.body).to.match(/nonExistingFunction/)
    })
  })

})