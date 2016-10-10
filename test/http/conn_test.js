const Conn = require('../../src/http/conn')
const expect = require('chai').expect

describe('Conn specs', () => {
  it('params', () => {
    conn = new Conn(null, null)
    expect(conn.params()).to.eql({})
    conn.addParams({foo: 'bar'})
    expect(conn.params()).to.eql({foo: 'bar'})
    conn.addParams({qux: 'fizz'})
    expect(conn.params()).to.eql({foo: 'bar', qux: 'fizz'})
    conn.addParams({qux: 'buzz'})
    expect(conn.params()).to.eql({foo: 'bar', qux: 'buzz'})
  })

  it('fetch params', () => {
    conn = new Conn(null, null)
    conn.addParams({user: { name: 'Luiz Paulo' }})
    expect(conn.params('user.name')).to.eq('Luiz Paulo')
  })

  it('check presence of params', () => {
    conn = new Conn(null, null)
    conn.addParams({user: { name: 'Luiz Paulo' }})
    expect(conn.hasParam('user')).to.be.true
    expect(conn.hasParam('user.name')).to.be.true
    expect(conn.hasParam('user.email')).to.be.false
    expect(conn.hasParam('comment')).to.be.false
  })
})