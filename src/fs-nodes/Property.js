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

class Property extends FireScriptNode {
  constructor (tokenStack, parent) {
    super(parent)

    this.key = this.createNode(tokenStack)

    if (!tokenStack.expect('punctuator', ':')) {
      this.syntaxError('Unexpected token', tokenStack.current())
    }

    tokenStack.goForward()
    const property = this.createNode(tokenStack)
    this.isAllowedToken(property, ALLOWED_ELEMENTS)
    this.value = property
  }

  parseBracelessSyntax (tokenStack) {
    tokenStack.goForward()
    const childIndention = this.indention + this.indentionSize
    console.log(tokenStack, this.indention, childIndention)

    while (true) {
      console.log('CHECK', tokenStack.current())
      if (tokenStack.isIndention(this.indention, 'lte')) {
        tokenStack.goForward()
        console.log('BRK')
        break
      }

      if (tokenStack.isIndention(childIndention, 'eq')) {
        console.log('CONT')
        tokenStack.goForward()
        continue
      }

      if (tokenStack.expect('indention')) {
        this.syntaxError('Invalid indention', tokenStack.current())
      }

      console.log(tokenStack, this.indention, childIndention)
      console.log(tokenStack.current())
      const elements = this.createNode(tokenStack)
      this.isAllowedToken(elements, ALLOWED_ELEMENTS)
      this.elements.push(elements)
    }
  }

  toJSON () {
    return {
      type: 'Property',
      key: this.key.toJSON(),
      value: this.value.toJSON(),
      shorthand: false
    }
  }
}

module.exports = Property
