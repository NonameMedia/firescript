const esprima = require('esprima')

class JSParser {
  parse (str) {
    return esprima.parseModule(str)
  }
}

module.exports = JSParser
