const inspect = require('inspect.js')
const TokenStack = require('../../../src/TokenStack')
const UnaryExpression = require('../../../src/fs-nodes/UnaryExpression')

const UNARY_OPERATORS = [
  '+', '-', '~', '!', 'delete', 'void', 'typeof'
]

describe('UnaryExpression', () => {
  describe('instance', () => {
    UNARY_OPERATORS.forEach((operator) => {
      it(`returns a UnaryExpression, using '${operator}'`, () => {
        const tokenStack = new TokenStack([
          { 'type': 'operator', 'value': operator },
          { 'type': 'identifier', 'value': 'foo' }
        ])

        const node = new UnaryExpression(tokenStack)

        inspect(node).isObject()
        inspect(node.type).isEql('UnaryExpression')
        inspect(node.toJSON()).isEql({
          type: 'UnaryExpression',
          operator: operator,
          argument: {
            type: 'Identifier',
            name: 'foo'
          },
          prefix: true
        })
      })
    })
  })
})
