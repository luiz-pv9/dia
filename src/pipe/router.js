const Scope = require('./scope')

class Router {
  constructor(dispatcher) {
    this.dispatcher = dispatcher
  }

  scope(callback) {
    let scope = new Scope(this.dispatcher)
    callback(scope)
  }
}

module.exports = Router