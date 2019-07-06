const inspect = require('inspect.js')
const sinon = require('sinon')
inspect.useSinon(sinon)

const Parser = require('../../../src/Parser')
const parserConf = require('../../../src/fs-parser/parserConf')

describe('FunctionDeclaration', () => {
  describe('resolveNodeName()', () => {
    let parser

    beforeEach(() => {
      parser = new Parser(parserConf)
    })

    it('resolves a FunctionDeclaration', () => {
      parser.parse('func banana ()\n  return \'banana\'')
      const nodeName = parser.resolveNodeName()
      inspect(nodeName).isEql('FunctionDeclaration')
    })
  })

  describe('createNode()', () => {
    let parser

    beforeEach(() => {
      parser = new Parser(parserConf)
    })

    it('parse a function declaration', () => {
      parser.parse('func banana ()\n  return \'banana\'')
      const node = parser.createNode('FunctionDeclaration')
      inspect(node).hasProps({
        type: 'FunctionDeclaration',
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

    it('parse a function declaration with an argument', () => {
      parser.parse('func banana (fruit)\n  return fruit')
      const node = parser.createNode('FunctionDeclaration')
      inspect(node).hasProps({
        type: 'FunctionDeclaration',
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

    it('parse a function declaration with multiple arguments', () => {
      parser.parse('func banana (fruit, color, isFresh)\n  return fruit')
      const node = parser.createNode('FunctionDeclaration')
      inspect(node).hasProps({
        type: 'FunctionDeclaration',
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

    it('parse a function declaration with multiple arguments', () => {
      parser.parse('func banana (obj fruit, str color, bool isFresh)\n  return fruit')
      const node = parser.createNode('FunctionDeclaration')
      console.log('NODE', node)
      inspect(node).hasProps({
        type: 'FunctionDeclaration',
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
