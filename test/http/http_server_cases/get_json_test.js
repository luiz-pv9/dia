const HTTPServer = require('../../../src/http/http_server')
const HTTPClient = require('../../../src/http_client/http_client')
const expect = require('chai').expect

describe('GET JSON', () => {
  let server, scope

  before(() => {
    server = new HTTPServer({port: 8000})
    scope = server.defaultScope

    scope.get('sum', conn => {
      let numA = parseInt(conn.params('a'))
      let numB = parseInt(conn.params('b'))
      return { sum: numA + numB }
    })

    return server.listen()
  })

  after(() => {
    return server.close()
  })

  it('reponds with JSON', () => {
    return HTTPClient.get('http://localhost:8000/sum?' + HTTPClient.params({a: 6, b: 4})).then(res => {
      expect(res.body).to.eql({
        sum: 10
      })
    })
  })
})