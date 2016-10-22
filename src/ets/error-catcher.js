const TEMPLATE_LINE_DIFFERENCE = 3
const TEMPLATE_COLUMN_DIFFERENCE = 1

function findTemplateErrorPosition(stack) {
  let match = /<anonymous>:([\d]+:[\d]+)/.exec(stack)
  if(match) {
    let position = match[1].split(':')
    return { 
      line: parseInt(position[0]) - TEMPLATE_LINE_DIFFERENCE,
      column: parseInt(position[1]) - TEMPLATE_COLUMN_DIFFERENCE
    }
  }
}

function wrapTemplateInFriendlyErrorCatcher(template) {
  return function(locals) {
    try {
      return template(locals)
    } catch(err) {
      let position = findTemplateErrorPosition(err.stack)
      err.templateLineNumber = position.line
      err.templateColumnNumber = position.column
      throw(err)
    }
  }
}

module.exports = wrapTemplateInFriendlyErrorCatcher