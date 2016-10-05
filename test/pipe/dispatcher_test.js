const Dispatcher = require('../../src/pipe/dispatcher');
const expect = require('chai').expect

describe('Dispatcher specs', () => {
  let dispatcher

  beforeEach(() => {
    dispatcher = new Dispatcher()
  })

  it('matches GET', () => {
    dispatcher.match(['get'], 'home', val => { return val + 1 })

    return dispatcher.dispatch('get', 'home', 1)
    .then(val => {
      expect(val).to.eq(2)
    })
  })

  it('matches POST', () => {
    dispatcher.match(['post'], 'home', val => { return val + 1 })

    return dispatcher.dispatch('post', 'home', 1)
    .then(val => {
      expect(val).to.eq(2)
    })
  })

  it('do not match GET on POST', () => {
    dispatcher.match(['post'], 'home', val => { return val + 1 })

    return dispatcher.dispatch('get', 'home', 1)
    .catch(err => {
      expect(err).to.match(/route/)
    })
  })
})