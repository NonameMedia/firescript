const Token = require('./Token')
const FirescriptTokenizer = require('../FirescriptTokenizer')

class TemplateToken extends Token {
  constructor (parent, value) {
    super(parent, value)
    this.type = 'template'
  }

  parseValue (value) {
    if (value && !(this.parent instanceof TemplateToken)) {
      this.splitTemplateLiteral(value)
    }

    return value
  }

  splitTemplateLiteral (literal) {
    this.subTokens = []
    const match = literal.slice(1, -1).split(/(\${[^]+?\})/)
    let prefixNext = false
    match.forEach((m) => {
      if (m.startsWith('${') && m.endsWith('}')) {
        prefixNext = true
        this.subTokens[this.subTokens.length - 1].value += '${'
        const subToken = new FirescriptTokenizer({
          range: this.setRange,
          loc: this.setLocation
        })
        const subTokenStack = subToken.tokenize(m.slice(2, -1))
        subTokenStack.forEach((token) => this.subTokens.push(token))
        return
      }

      this.subTokens.push(new TemplateToken(this, prefixNext ? '}' + m : m).toJSON())
      prefixNext = false
    })

    if (prefixNext) {
      this.subTokens.push(new TemplateToken(this, '}').toJSON())
    }
  }
}

module.exports = TemplateToken
