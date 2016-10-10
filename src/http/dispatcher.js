const Conn = require('./conn')

function generatePathMatcher(path) {
  let regexStr = path.replace(/(\:[^\/]+)/g, '([^\/]+)')
  return regexStr
}

function getNamedParams(path) {
  let regex = /(\:[^\/]+)/g
  let match = null, namedParams = [null]
  while(match = regex.exec(path)) {
    namedParams.push(match[1].replace(':', ''))
  }
  return namedParams
}

function generateNamedParamsObject(route, match) {
  let params = {}
  for(let i = 1; i < route.namedParams.length; i++) {
    params[route.namedParams[i]] = match[i]
  }
  return params
}

class Dispatcher {
  constructor() {
    this.routes = {}
  }

  match(methods, path, callback) {
    methods.forEach(method => {
      method = method.toLowerCase()
      let routes = this.routes[method] || []
      routes.push({ 
        method, 
        path, 
        callback, 
        matcher: generatePathMatcher(path), 
        namedParams: getNamedParams(path)
      })
      this.routes[method] = routes
    })
  }

  dispatch(method, path, arg) {
    method = method.toLowerCase()
    return new Promise((resolve, reject) => {
      let routes = this.routes[method] || [], match = null
      let route = routes.find(route => {
        let matcher = new RegExp(route.matcher) 
        match = matcher.exec(path)
        return match !== null
      })
      if(!route) {
        // TODO: reject with proper error
        return reject("no route found")
      }
      if(arg instanceof Conn) {
        // TODO: do we need this check? The only place arg won't be an instance
        // of Conn is in tests.
        arg.addParams(generateNamedParamsObject(route, match))
      }
      return resolve(route.callback(arg))
    })
  }
}

module.exports = Dispatcher