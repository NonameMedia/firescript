const inspect = require('inspect.js')
const TokenStack = require('../../../src/TokenStack')
const Literal = require('../../../src/fs-nodes/Literal')
const AssignmentPattern = require('../../../src/fs-nodes/AssignmentPattern')

const ASSIGNMENT_OPERASTORS = [
  '='
]

describe('AssignmentPattern', () => {
  describe('instance', () => {
    ASSIGNMENT_OPERASTORS.forEach((operator) => {
      it(`returns a AssignmentPattern, using '${operator}'`, () => {
        const tokenStack = new TokenStack([
          { 'type': 'numeric', 'value': '6' },
          { 'type': 'operator', 'value': operator },
          { 'type': 'numeric', 'value': '7' }
        ])

        const node = new AssignmentPattern(tokenStack)

        inspect(node).isObject()
        inspect(node.type).isEql('AssignmentPattern')
        inspect(node.toJSON()).isEql({
          type: 'AssignmentPattern',
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

    ASSIGNMENT_OPERASTORS.forEach((operator) => {
      it(`returns a AssignmentPattern, using '${operator}', get left from outside`, () => {
        const tokenStack = new TokenStack([
          { 'type': 'numeric', 'value': '6' },
          { 'type': 'operator', 'value': operator },
          { 'type': 'numeric', 'value': '7' }
        ])

        const left = new Literal(tokenStack)
        const node = new AssignmentPattern(tokenStack, null, left)

        inspect(node).isObject()
        inspect(node.type).isEql('AssignmentPattern')
        inspect(node.toJSON()).isEql({
          type: 'AssignmentPattern',
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
