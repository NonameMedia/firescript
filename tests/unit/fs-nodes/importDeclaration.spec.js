const inspect = require('inspect.js')
const TokenStack = require('../../../src/TokenStack')
const ImportDeclaration = require('../../../src/fs-nodes/ImportDeclaration')

describe('ImportDeclaration', () => {
  describe('instance', () => {
    it('returns a ImportDeclaration node with an ImportDefaultSpecifier', () => {
      const tokenStack = new TokenStack([
        { 'type': 'keyword', 'value': 'import' },
        { 'type': 'identifier', 'value': 'foo' },
        { 'type': 'identifier', 'value': 'from' },
        { 'type': 'literal', 'value': '"foo"' }
      ])

      const node = new ImportDeclaration(tokenStack)

      inspect(node).isObject()
      inspect(node.type).isEql('ImportDeclaration')
      inspect(node.toJSON()).isEql({
        type: 'ImportDeclaration',
        specifiers: [{
          type: 'ImportDefaultSpecifier',
          local: {
            type: 'Identifier',
            name: 'foo'
          }
        }],
        source: {
          type: 'Literal',
          raw: '"foo"',
          value: 'foo'
        }
      })
    })

    it('returns a ImportDeclaration node with an ImportSpecifier', () => {
      const tokenStack = new TokenStack([
        { 'type': 'keyword', 'value': 'import' },
        { 'type': 'punctuator', 'value': '{' },
        { 'type': 'identifier', 'value': 'foo' },
        { 'type': 'punctuator', 'value': '}' },
        { 'type': 'identifier', 'value': 'from' },
        { 'type': 'literal', 'value': '"foo"' }
      ])

      const node = new ImportDeclaration(tokenStack)

      inspect(node).isObject()
      inspect(node.type).isEql('ImportDeclaration')
      inspect(node.toJSON()).isEql({
        type: 'ImportDeclaration',
        specifiers: [{
          type: 'ImportSpecifier',
          imported: {
            type: 'Identifier',
            name: 'foo'
          },
          local: {
            type: 'Identifier',
            name: 'foo'
          }
        }],
        source: {
          type: 'Literal',
          raw: '"foo"',
          value: 'foo'
        }
      })
    })

    it('returns a ImportDeclaration node with an ImportSpecifier, different import name', () => {
      const tokenStack = new TokenStack([
        { 'type': 'keyword', 'value': 'import' },
        { 'type': 'punctuator', 'value': '{' },
        { 'type': 'identifier', 'value': 'foo' },
        { 'type': 'identifier', 'value': 'as' },
        { 'type': 'identifier', 'value': 'bar' },
        { 'type': 'punctuator', 'value': '}' },
        { 'type': 'identifier', 'value': 'from' },
        { 'type': 'literal', 'value': '"foo"' }
      ])

      const node = new ImportDeclaration(tokenStack)

      inspect(node).isObject()
      inspect(node.type).isEql('ImportDeclaration')
      inspect(node.toJSON()).isEql({
        type: 'ImportDeclaration',
        specifiers: [{
          type: 'ImportSpecifier',
          imported: {
            type: 'Identifier',
            name: 'foo'
          },
          local: {
            type: 'Identifier',
            name: 'bar'
          }
        }],
        source: {
          type: 'Literal',
          raw: '"foo"',
          value: 'foo'
        }
      })
    })

    it('returns a ImportDeclaration node with an ImportNamespaceSpecifier', () => {
      const tokenStack = new TokenStack([
        { 'type': 'keyword', 'value': 'import' },
        { 'type': 'operator', 'value': '*' },
        { 'type': 'identifier', 'value': 'as' },
        { 'type': 'identifier', 'value': 'bar' },
        { 'type': 'identifier', 'value': 'from' },
        { 'type': 'literal', 'value': '"foo"' }
      ])

      const node = new ImportDeclaration(tokenStack)

      inspect(node).isObject()
      inspect(node.type).isEql('ImportDeclaration')
      inspect(node.toJSON()).isEql({
        type: 'ImportDeclaration',
        specifiers: [{
          type: 'ImportNamespaceSpecifier',
          local: {
            type: 'Identifier',
            name: 'bar'
          }
        }],
        source: {
          type: 'Literal',
          raw: '"foo"',
          value: 'foo'
        }
      })
    })

    it('returns a ImportDeclaration node without any ImportSpecifiers', () => {
      const tokenStack = new TokenStack([
        { 'type': 'keyword', 'value': 'import' },
        { 'type': 'literal', 'value': '"foo"' }
      ])

      const node = new ImportDeclaration(tokenStack)

      inspect(node).isObject()
      inspect(node.type).isEql('ImportDeclaration')
      inspect(node.toJSON()).isEql({
        type: 'ImportDeclaration',
        specifiers: [],
        source: {
          type: 'Literal',
          raw: '"foo"',
          value: 'foo'
        }
      })
    })
  })
})
