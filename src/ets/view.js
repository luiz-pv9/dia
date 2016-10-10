const HTML = require('./html')

// TODO: extract to own file
class HTMLSafeString {
  constructor(content) {
    this.content = content
  }
}

/**
 * View instances are the context of the rendered templates.
 */
class View {
  constructor() {
  }

  escape(str) {
    if(str instanceof HTMLSafeString) {
      return str.content
    }
    return HTML.escape(str)
  }

  raw(str) {
    return new HTMLSafeString(str)
  }
}

module.exports = View