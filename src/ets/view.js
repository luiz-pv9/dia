const HTML = require('./html')
const HTMLSafeString = require('./html-safe-string')

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