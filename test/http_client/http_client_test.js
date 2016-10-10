const HTTPClient = require('../../src/http_client/http_client')
const expect = require('chai').expect

describe('HTTPClient specs', () => {
  it('get html', () => {
    return HTTPClient.get('http://httpbin.org').then(res => {
      expect(res.statusCode).to.eq(200)
      expect(res.statusMessage).to.eq('OK')
      expect(res.headers['content-type']).to.match(/html/)
    })
  })

  it('get json', () => {
    // httpbin.org/ip returns a json object with the format `{ origin: '...' }`
    return HTTPClient.get('http://httpbin.org/ip').then(res => {
      expect(res.headers['content-type']).to.match(/json/)
      expect(res.body).to.be.an.object
      expect(res.body.origin).to.be.ok
    })
  })

  it('get with params', () => {
    let url = 'http://httpbin.org/get?' + HTTPClient.params({
      name: 'Luiz', 
      age: 23
    })
    return HTTPClient.get(url).then(res => {
      expect(res.headers['content-type']).to.match(/json/)
      expect(res.body.args).to.eql({name: 'Luiz', age: '23'}) // notice 23 was casted to string
    })
  })

  it('post', () => {
    let data = { name: 'Luiz', age: 23 }
    return HTTPClient.post('http://httpbin.org/post', data).then(res => {
      expect(res.headers['content-type']).to.match(/json/)
      expect(res.body.form).to.eql({name: 'Luiz', age: '23'}) // notice 23 was casted to string
    })
  })
})