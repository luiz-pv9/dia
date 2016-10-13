const HTTPServer = require('../../../src/http/http_server')
const HTTPClient = require('../../../src/http_client/http_client')
const expect = require('chai').expect
const parseBody = require('../../../src/http/pipeline/parse_body')

describe('POST JSON', () => {
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

  it('parses JSON body', () => {
    let data = {name: 'Luiz', age: 20}
    return HTTPClient.post('http://localhost:8000/users', data, { json: true }).then(res => {
      expect(res.statusCode).to.eq(200)
      expect(res.body).to.eql({
        name: 'Luiz',
        age: 20 // notice 20 is a number (it would be casted to string if it was form data)
      })
    })
  })
})