const Router = require('../../src/pipe/router')
const Dispatcher = require('../../src/pipe/dispatcher')
const expect = require('chai').expect

describe('Router specs', () => {
  let router, dispatcher
  beforeEach(() => {
    dispatcher = new Dispatcher()
    router = new Router(dispatcher)
  })

  it('has scopes', () => {
    let firstScope, secondScope

    router.scope(scope => { firstScope = scope })
    router.scope(scope => { secondScope = scope })

    expect(firstScope).to.be.ok
    expect(secondScope).to.be.ok
    expect(firstScope).not.to.eq(secondScope)
  })
})