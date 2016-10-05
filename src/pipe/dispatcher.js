class Dispatcher {
  constructor() {
    this.routes = {}
  }

  match(methods, path, callback) {
    methods.forEach(method => {
      method = method.toLowerCase()
      let routes = this.routes[method] || []
      routes.push({ method, path, callback })
      this.routes[method] = routes
    })
  }

  dispatch(method, path, arg) {
    method = method.toLowerCase()
    return new Promise((resolve, reject) => {
      let routes = this.routes[method] || []
      let route = routes.find(route => {
        return path === route.path
      })
      if( ! route) return reject("no route found")
      return resolve(route.callback(arg))
    })
  }
}

module.exports = Dispatcher