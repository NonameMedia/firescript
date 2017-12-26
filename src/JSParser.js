const esprima = require('esprima')

class JSParser {
  parseAST (str) {
    return esprima.parseModule(str)
  }
}

module.exports = JSParser
