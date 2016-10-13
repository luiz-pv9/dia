const Dispatcher = require('../../src/http-server/dispatcher')
const Conn = require('../../src/http-server/conn')
const expect = require('chai').expect

describe('Dispatcher specs', () => {
  let dispatcher

  beforeEach(() => {
    dispatcher = new Dispatcher()
  })

  it('matches GET', () => {
    dispatcher.match(['get'], 'home', val => { return val + 1 })

    return dispatcher.dispatch('get', 'home', 1).then(val => {
      expect(val).to.eq(2)
    })
  })

  it('matches POST', () => {
    dispatcher.match(['post'], 'home', val => { return val + 1 })

    return dispatcher.dispatch('post', 'home', 1).then(val => {
      expect(val).to.eq(2)
    })
  })

  it('do not match GET on POST', () => {
    dispatcher.match(['post'], 'home', val => { return val + 1 })

    return dispatcher.dispatch('get', 'home', 1).catch(err => {
      expect(err).to.match(/route/)
    })
  })

  it('named params', () => {
    dispatcher.match(['get'], 'users/:id', conn => { return conn.params('id') })

    return dispatcher.dispatch('get', 'users/54', new Conn(null, null)).then(id => {
      expect(id).to.eq('54')
    })
  })

  it('multiple named params', () => {
    dispatcher.match(['get'], 'users/:id/comments/:cid', conn => {
      return conn.params()
    })
    return dispatcher.dispatch('get', 'users/3/comments/15', new Conn(null, null)).then(params => {
      expect(params).to.eql({id: '3', cid: '15'})
    })
  })
})