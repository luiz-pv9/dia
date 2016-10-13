const HTTPServer = require('../../../src/http-server/http-server')
const HTTPClient = require('../../../src/http-client/http-client')
const expect = require('chai').expect
const parseBody = require('../../../src/http-server/pipeline/parse-body')

describe('POST form data', () => {
  let server, scope

  before(() => {
    server = new HTTPServer({ port: 8000 })
    scope = server.defaultScope
    scope.pipe(parseBody)
    scope.post('users', conn => {
      return conn.params()
    })
    return server.listen()
  })

  after(() => {
    return server.close()
  })

  it('parses form data', () => {
    let data = { name: 'Luiz', age: 20 }
    return HTTPClient.post('http://localhost:8000/users', data).then(res => {
      expect(res.statusCode).to.eq(200)
      expect(res.body).to.eql({name: 'Luiz', age: '20'})
    })
  })
})
