const inspect = require('inspect.js')
const TokenStack = require('../../../src/TokenStack')
const ExportNamedDeclaration = require('../../../src/fs-nodes/ExportNamedDeclaration')

describe('ExportNamedDeclaration', () => {
  describe('instance', () => {
    it('returns a ExportNamedDeclaration node with a ClassDeclaration', () => {
      const tokenStack = new TokenStack([
        { 'type': 'keyword', 'value': 'export' },
        { 'type': 'keyword', 'value': 'class' },
        { 'type': 'identifier', 'value': 'foo' },
        { 'type': 'indention', 'value': 4 },
        { 'type': 'indention', 'value': 2 }
      ])

      const node = new ExportNamedDeclaration(tokenStack)

      inspect(node).isObject()
      inspect(node.type).isEql('ExportNamedDeclaration')
      inspect(node.toJSON()).isEql({
        type: 'ExportNamedDeclaration',
        declaration: {
          type: 'ClassDeclaration',
          id: {
            type: 'Identifier',
            name: 'foo'
          },
          body: {
            type: 'ClassBody',
            body: []
          },
          superClass: null
        },
        specifiers: [],
        source: null
      })
    })

    it('returns a ExportNamedDeclaration node with a FunctionDeclaration', () => {
      const tokenStack = new TokenStack([
        { 'type': 'keyword', 'value': 'export' },
        { 'type': 'keyword', 'value': 'func' },
        { 'type': 'identifier', 'value': 'foo' },
        { 'type': 'punctuator', 'value': '(' },
        { 'type': 'punctuator', 'value': ')' },
        { 'type': 'indention', 'value': 4 },
        { 'type': 'indention', 'value': 2 }
      ])

      const node = new ExportNamedDeclaration(tokenStack)

      inspect(node).isObject()
      inspect(node.type).isEql('ExportNamedDeclaration')
      inspect(node.toJSON()).isEql({
        type: 'ExportNamedDeclaration',
        declaration: {
          type: 'FunctionDeclaration',
          id: {
            type: 'Identifier',
            name: 'foo'
          },
          body: {
            type: 'BlockStatement',
            body: []
          },
          async: false,
          generator: false,
          params: [],
          expression: false
        },
        specifiers: [],
        source: null
      })
    })

    it('returns a ExportNamedDeclaration node with a VariableDeclaration', () => {
      const tokenStack = new TokenStack([
        { 'type': 'keyword', 'value': 'export' },
        { 'type': 'keyword', 'value': 'let' },
        { 'type': 'identifier', 'value': 'foo' },
        { 'type': 'indention', 'value': 2 }
      ])

      const node = new ExportNamedDeclaration(tokenStack)

      inspect(node).isObject()
      inspect(node.type).isEql('ExportNamedDeclaration')
      inspect(node.toJSON()).isEql({
        type: 'ExportNamedDeclaration',
        declaration: {
          type: 'VariableDeclaration',
          kind: 'let',
          declarations: [{
            type: 'VariableDeclarator',
            id: {
              type: 'Identifier',
              name: 'foo'
            },
            init: null
          }]
        },
        specifiers: [],
        source: null
      })
    })

    it('returns a ExportNamedDeclaration node with a named export', () => {
      const tokenStack = new TokenStack([
        { 'type': 'keyword', 'value': 'export' },
        { 'type': 'identifier', 'value': 'foo' },
        { 'type': 'indention', 'value': 2 }
      ])

      const node = new ExportNamedDeclaration(tokenStack)

      inspect(node).isObject()
      inspect(node.type).isEql('ExportNamedDeclaration')
      inspect(node.toJSON()).isEql({
        type: 'ExportNamedDeclaration',
        declaration: null,
        specifiers: [{
          type: 'ExportSpecifier',
          exported: {
            type: 'Identifier',
            name: 'foo'
          },
          local: {
            type: 'Identifier',
            name: 'foo'
          }
        }],
        source: null
      })
    })

    it('returns a ExportNamedDeclaration node with a aliased export', () => {
      const tokenStack = new TokenStack([
        { 'type': 'keyword', 'value': 'export' },
        { 'type': 'identifier', 'value': 'foo' },
        { 'type': 'identifier', 'value': 'as' },
        { 'type': 'identifier', 'value': 'one' },
        { 'type': 'indention', 'value': 2 }
      ])

      const node = new ExportNamedDeclaration(tokenStack)

      inspect(node).isObject()
      inspect(node.type).isEql('ExportNamedDeclaration')
      inspect(node.toJSON()).isEql({
        type: 'ExportNamedDeclaration',
        declaration: null,
        specifiers: [{
          type: 'ExportSpecifier',
          exported: {
            type: 'Identifier',
            name: 'foo'
          },
          local: {
            type: 'Identifier',
            name: 'one'
          }
        }],
        source: null
      })
    })

    it('returns a ExportNamedDeclaration node with multiple named export', () => {
      const tokenStack = new TokenStack([
        { 'type': 'keyword', 'value': 'export' },
        { 'type': 'identifier', 'value': 'foo' },
        { 'type': 'punctuator', 'value': ',' },
        { 'type': 'identifier', 'value': 'bar' },
        { 'type': 'indention', 'value': 2 }
      ])

      const node = new ExportNamedDeclaration(tokenStack)

      inspect(node).isObject()
      inspect(node.type).isEql('ExportNamedDeclaration')
      inspect(node.toJSON()).isEql({
        type: 'ExportNamedDeclaration',
        declaration: null,
        specifiers: [{
          type: 'ExportSpecifier',
          exported: {
            type: 'Identifier',
            name: 'foo'
          },
          local: {
            type: 'Identifier',
            name: 'foo'
          }
        }, {
          type: 'ExportSpecifier',
          exported: {
            type: 'Identifier',
            name: 'bar'
          },
          local: {
            type: 'Identifier',
            name: 'bar'
          }
        }],
        source: null
      })
    })

    it('returns a ExportNamedDeclaration node with a aliased export', () => {
      const tokenStack = new TokenStack([
        { 'type': 'keyword', 'value': 'export' },
        { 'type': 'identifier', 'value': 'foo' },
        { 'type': 'identifier', 'value': 'as' },
        { 'type': 'identifier', 'value': 'one' },
        { 'type': 'punctuator', 'value': ',' },
        { 'type': 'identifier', 'value': 'bar' },
        { 'type': 'identifier', 'value': 'as' },
        { 'type': 'identifier', 'value': 'two' },
        { 'type': 'indention', 'value': 2 }
      ])

      const node = new ExportNamedDeclaration(tokenStack)

      inspect(node).isObject()
      inspect(node.type).isEql('ExportNamedDeclaration')
      inspect(node.toJSON()).isEql({
        type: 'ExportNamedDeclaration',
        declaration: null,
        specifiers: [{
          type: 'ExportSpecifier',
          exported: {
            type: 'Identifier',
            name: 'foo'
          },
          local: {
            type: 'Identifier',
            name: 'one'
          }
        }, {
          type: 'ExportSpecifier',
          exported: {
            type: 'Identifier',
            name: 'bar'
          },
          local: {
            type: 'Identifier',
            name: 'two'
          }
        }],
        source: null
      })
    })
  })
})
