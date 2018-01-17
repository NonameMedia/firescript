const inspect = require('inspect.js')
const TokenStack = require('../../../src/TokenStack')
// const FunctionExpression = require('../../../src/fs-nodes/FunctionExpression')

describe('FunctionExpression', () => {
  describe('instance', () => {
    const tokenStack = new TokenStack([
      { type: 'keyword', value: 'func' },
      { type: 'identifier', value: 'bla' },
      { type: 'punctuator', value: '(' },
      { type: 'identifier', value: 'num1' },
      { type: 'punctuator', value: ')' },
      { type: 'indention', value: '2' },
      { type: 'keyword', value: 'const' },
      { type: 'identifier', value: 'res' },
      { type: 'operator', value: '=' },
      { type: 'identifier', value: 'num1' },
      { type: 'operator', value: '+' },
      { type: 'numeric', value: '1' },
      { type: 'indention', value: '2' },
      { type: 'keyword', value: 'return' },
      { type: 'identifier', value: 'res' },
      { type: 'indention', value: '0' }

    ])

    it('returns a fs-node item', () => {
      const node = new FunctionExpression(tokenStack)

      inspect(node).isObject()
      inspect(node.type).isEql('FunctionExpression')
    })
  })
})
