const inspect = require('inspect.js')
const sinon = require('sinon')
inspect.useSinon(sinon)

const Parser = require('../../../src/Parser')
const parserConf = require('../../../src/fs-parser/parserConf')

describe('FunctionExpression', () => {
  describe('resolveNodeName()', () => {
    let parser

    beforeEach(() => {
      parser = new Parser(parserConf)
    })

    it('resolves a FunctionExpression', () => {
      parser.parse('func banana ()\n  return \'banana\'')
      const nodeName = parser.resolveNodeName({
        type: 'VariableDeclarator'
      })

      inspect(nodeName).isEql('FunctionExpression')
    })
  })

  describe('createNode()', () => {
    let parser

    beforeEach(() => {
      parser = new Parser(parserConf)
    })

    it('parse a function expression', () => {
      parser.parse('func banana ()\n  return \'banana\'')
      const node = parser.createNode('FunctionExpression')
      inspect(node).hasProps({
        type: 'FunctionExpression',
        id: {
          type: 'Identifier',
          name: 'banana'
        },
        params: [],
        body: {
          type: 'BlockStatement',
          body: [{
            type: 'ReturnStatement'
          }]
        }
      })
    })

    it('parse a function expression with an argument', () => {
      parser.parse('func banana (fruit)\n  return fruit')
      const node = parser.createNode('FunctionExpression')
      inspect(node).hasProps({
        type: 'FunctionExpression',
        id: {
          type: 'Identifier',
          name: 'banana'
        },
        params: [{
          type: 'Identifier',
          name: 'fruit'
        }],
        body: {
          type: 'BlockStatement',
          body: [{
            type: 'ReturnStatement'
          }]
        }
      })
    })

    it('parse a function expression with multiple arguments', () => {
      parser.parse('func banana (fruit, color, isFresh)\n  return fruit')
      const node = parser.createNode('FunctionExpression')
      inspect(node).hasProps({
        type: 'FunctionExpression',
        id: {
          type: 'Identifier',
          name: 'banana'
        },
        params: [{
          type: 'Identifier',
          name: 'fruit'
        }, {
          type: 'Identifier',
          name: 'color'
        }, {
          type: 'Identifier',
          name: 'isFresh'
        }],
        body: {
          type: 'BlockStatement',
          body: [{
            type: 'ReturnStatement'
          }]
        }
      })
    })

    it('parse a function expression with multiple arguments', () => {
      parser.parse('func banana (obj fruit, str color, bool isFresh)\n  return fruit')
      const node = parser.createNode('FunctionExpression')
      console.log('NODE', node)
      inspect(node).hasProps({
        type: 'FunctionExpression',
        id: {
          type: 'Identifier',
          name: 'banana'
        },
        params: [{
          type: 'Identifier',
          name: 'fruit'
        }, {
          type: 'Identifier',
          name: 'color'
        }, {
          type: 'Identifier',
          name: 'isFresh'
        }],
        body: {
          type: 'BlockStatement',
          body: [{
            type: 'ReturnStatement'
          }]
        }
      })
    })
  })
})
