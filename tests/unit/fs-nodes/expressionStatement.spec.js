const inspect = require('inspect.js')
const TokenStack = require('../../../src/TokenStack')
const AssignmentExpression = require('../../../src/fs-nodes/AssignmentExpression')
const ExpressionStatement = require('../../../src/fs-nodes/ExpressionStatement')

describe('AssignmentExpression', () => {
  describe('instance', () => {
    it(`returns an ExpressionStatement`, () => {
      const tokenStack = new TokenStack([
        { 'type': 'numeric', 'value': '6' },
        { 'type': 'operator', 'value': '=' },
        { 'type': 'numeric', 'value': '7' }
      ])

      const assignmentExpression = new AssignmentExpression(tokenStack)
      const node = new ExpressionStatement(tokenStack, null, assignmentExpression)

      inspect(node).isObject()
      inspect(node.type).isEql('ExpressionStatement')
      inspect(node.toJSON()).isEql({
        type: 'ExpressionStatement',
        expression: {
          type: 'AssignmentExpression',
          operator: '=',
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
        }
      })
    })
  })
})
