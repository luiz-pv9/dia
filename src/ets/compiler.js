const View = require('./view')

class Compiler {
  static replaceAssignWithLocals(templateString) {
    return templateString.replace(/\@([a-zA-Z0-9])/g, 'locals.$1')
  }

  static interpolateEchos(templateString) {
    return templateString.replace(/<%=([\s\S]+?)%>/g, '${escape($1)}')
  }

  constructor() {
  }

  inline(templateString, view = new View()) {
    templateString = Compiler.replaceAssignWithLocals(templateString)
    templateString = Compiler.interpolateEchos(templateString)
    let functionBody = 'with(this) { return `'+templateString+'`; }'
    let render = new Function('locals', functionBody)
    return render.bind(view)
  }
}

module.exports = Compiler