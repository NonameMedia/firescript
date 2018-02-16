const inspect = require('inspect.js')
const TokenStack = require('../../../src/TokenStack')
const BinaryExpression = require('../../../src/fs-nodes/BinaryExpression')

const BINARY_OPERASTORS = [
  'instanceof', 'in', '+', '-', '*', '/', '%', '**',
  '|', '^', '&', '==', '!=', '===', '!==',
  '<', '>', '<=', '<<', '>>', '>>>'
]

describe('BinaryExpression', () => {
  describe('instance', () => {
    BINARY_OPERASTORS.forEach((operator) => {
      it(`returns a BinaryOperator, using '${operator}'`, () => {
        const tokenStack = new TokenStack([
          { 'type': 'numeric', 'value': '6' },
          { 'type': 'operator', 'value': operator },
          { 'type': 'numeric', 'value': '7' }
        ])

        const node = new BinaryExpression(tokenStack)

        inspect(node).isObject()
        inspect(node.type).isEql('BinaryExpression')
        inspect(node.toJSON()).isEql({
          type: 'BinaryExpression',
          operator: operator,
          left: {
            type: 'Literal',
            raw: '6',
            value: 6
          },
          right: {
            type: 'Literal',
            raw: '7',
            value: 7
          }
        })
      })
    })
  })
})
