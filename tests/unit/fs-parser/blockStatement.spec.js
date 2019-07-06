const inspect = require('inspect.js')
const sinon = require('sinon')
inspect.useSinon(sinon)

const Parser = require('../../../src/Parser')
const parserConf = require('../../../src/fs-parser/parserConf')

describe('BlockStatement', () => {
  describe('createNode()', () => {
    let parser

    beforeEach(() => {
      parser = new Parser(parserConf)
    })

    it('parse a block statement', () => {
      parser.parse('\n  const res = num1')
      const node = parser.createNode('BlockStatement')
      inspect(node).hasProps({
        type: 'BlockStatement',
        body: [{
          type: 'VariableDeclaration',
          kind: 'const',
          declarations: [{
            type: 'VariableDeclarator',
            id: {
              type: 'Identifier',
              name: 'res'
            },
            init: {
              type: 'Identifier',
              name: 'num1'
            },
            'fsTyping': {
              'type': 'FirescriptTyping',
              'name': 'any'
            }
          }]
        }]
      })
    })

    it('parse a block statement with two items', () => {
      parser.parse('\n  const res = num1\n  const banana = \'yellow\'')
      const node = parser.createNode('BlockStatement')
      inspect(node).hasProps({
        type: 'BlockStatement',
        body: [{
          type: 'VariableDeclaration',
          kind: 'const',
          declarations: [{
            type: 'VariableDeclarator',
            id: {
              type: 'Identifier',
              name: 'res'
            },
            init: {
              type: 'MemberExpression',
              computed: false,
              object: {
                type: 'ThisExpression'
              },
              property: {
                type: 'Identifier',
                name: 'num1'
              }
            },
            fsTyping: {
              type: 'FirescriptTyping',
              name: 'any'
            }
          }]
        }, {
          type: 'VariableDeclaration',
          kind: 'const',
          declarations: [{
            type: 'VariableDeclarator',
            id: {
              type: 'Identifier',
              name: 'banana'
            },
            init: {
              type: 'Literal',
              raw: '\'yellow\'',
              value: 'banana'
            },
            fsTyping: {
              type: 'FirescriptTyping',
              name: 'any'
            }
          }]
        }]
      })
    })
  })
})
