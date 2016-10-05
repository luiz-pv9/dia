const Scope = require('../../src/pipe/scope')
const Dispatcher = require('../../src/pipe/dispatcher')
const expect = require('chai').expect

describe('Scope specs', () => {
  let scope, dispatcher

  beforeEach(() => {
    dispatcher = new Dispatcher()
    scope = new Scope(dispatcher)
  })

  it('get', () => {
    scope.get('home', val => { return val + 1 })

    return dispatcher.dispatch('get', 'home', 1).then(val => {
      expect(val).to.eq(2)
    })
  })

  it('post', () => {
    scope.post('home', val => { return val + 1 })

    return dispatcher.dispatch('post', 'home', 1).then(val => {
      expect(val).to.eq(2)
    })
  })

  it('pipe', () => {
    scope.pipe(val => { return val + 1 })
    scope.get('home', val => { return val * 2 })

    return dispatcher.dispatch('get', 'home', 1).then(val => {
      expect(val).to.eq(4) // (1 + 1) * 2
    })
  })

  it('pipe multiple in order', () => {
    scope.pipe(val => { return val + 1 })
    scope.pipe(val => { return val * 3 })
    scope.get('home', val => { return val + 2 })

    return dispatcher.dispatch('get', 'home', 1).then(val => {
      expect(val).to.eq(8) // (((1 + 1) * 3) + 2) = 8
    })
  })

  it('rejects on step failure', () => {
    scope.pipe(val => { return Promise.reject("something failed") })
    scope.get('home', val => { return val + 1 })

    return dispatcher.dispatch('get', 'home', 1).catch(err => {
      expect(err).to.eq('something failed')
    })
  })

  it('prefix', () => {
    scope.prefix('admin')
    scope.get('home', val => { return val + 1 })

    return dispatcher.dispatch('get', 'admin/home', 1).then(val => {
      expect(val).to.eq(2)
    })
  })

  it('nest with inherited prefix', () => {
    scope.prefix('admin')
    scope.group(scope => {
      scope.prefix('super')
      scope.get('home', val => { return val + 1 })
    })

    return dispatcher.dispatch('get', 'admin/super/home', 1).then(val => {
      expect(val).to.eq(2)
    })
  })

  it('doesnt change the parent prefix')

  it('nest with inherited pipeline', () => {
    scope.pipe(val => { return val + 1 })
    scope.group(scope => {
      scope.pipe(val => { return val * 2 })
      scope.get('home', val => { return val + 2 })
    })

    return dispatcher.dispatch('get', 'home', 1).then(val => {
      expect(val).to.eq(6) // ((1 + 1) * 2) + 2
    })
  })

  it('doesnt change the parent pipeline', () => {
    scope.group(scope => {
      scope.pipe(val => { return val + 5 })
    })
    scope.get('home', val => { return val + 1 })
    
    return dispatcher.dispatch('get', 'home', 1).then(val => {
      expect(val).to.eq(2)
    })
  })
})
