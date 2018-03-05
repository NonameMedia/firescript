const FireScriptNode = require('./FireScriptNode')

const ALLOWED_ELEMENTS = [
  'ThisExpression',
  'Identifier',
  'Literal',
  'ArrayExpression',
  'ObjectExpression',
  'FunctionExpression',
  'ArrowFunctionExpression',
  'ClassExpression',
  'TaggedTemplateExpression',
  'MemberExpression',
  'Super',
  'MetaProperty',
  'NewExpression',
  'CallExpression',
  'UpdateExpression',
  'AwaitExpression',
  'UnaryExpression',
  'BinaryExpression',
  'LogicalExpression',
  'ConditionalExpression',
  'YieldExpression',
  'AssignmentExpression',
  'SequenceExpression',
  'SpreadElement'
]

class ArrayExpression extends FireScriptNode {
  constructor (tokenStack, parent) {
    super(parent)

    this.elements = []

    if (tokenStack.expect('punctuator', '[')) {
      this.parseCommonSyntax(tokenStack)
    } else if (tokenStack.expect('indention', this.indention + this.indentionSize)) {
      this.parseBracelessSyntax(tokenStack)
    } else {
      this.syntaxError('Array declaration expected', tokenStack.current())
    }
  }

  parseCommonSyntax (tokenStack) {
    tokenStack.goForward()

    this.indention = tokenStack.getIndention()

    while (true) {
      if (tokenStack.expect('punctuator', ']')) {
        tokenStack.goForward()
        break
      }

      const elements = this.createFullNode(tokenStack)
      this.isAllowedNode(elements, ALLOWED_ELEMENTS)
      this.elements.push(elements)

      if (tokenStack.expect('punctuator', ',')) {
        tokenStack.goForward()
        continue
      } else if (tokenStack.expect('indention')) {
        if (tokenStack.isIndention('lt', this.indention)) {
          tokenStack.goForward()
          if (tokenStack.expect('punctuator', ']')) {
            tokenStack.goForward()
          }
          break
        } else if (tokenStack.isIndention('eq', this.indention)) {
          tokenStack.goForward()
          continue
        } else {
          this.syntaxError('Indetion error!')
        }
      } else if (tokenStack.expect('punctuator', ']')) {
        tokenStack.goForward()
        break
      } else {
        this.syntaxError('Unexpected token!', tokenStack.current())
      }

      break
    }
  }

  parseBracelessSyntax (tokenStack) {
    tokenStack.goForward()
    const childIndention = this.indention + this.indentionSize

    while (true) {
      if (tokenStack.isIndention('lte', this.indention)) {
        tokenStack.goForward()
        break
      }

      if (tokenStack.isIndention('eq', childIndention)) {
        tokenStack.goForward()
        continue
      }

      if (tokenStack.expect('indention')) {
        this.syntaxError('Invalid indention', tokenStack.current())
      }

      const elements = this.createFullNode(tokenStack)
      this.isAllowedNode(elements, ALLOWED_ELEMENTS)
      this.elements.push(elements)
    }
  }

  toJSON () {
    return {
      type: 'ArrayExpression',
      elements: this.elements.map((item) => item.toJSON())
    }
  }
}

module.exports = ArrayExpression
