const inspect = require('inspect.js')
const TokenStack = require('../../src/TokenStack')
const FirescriptNode = require('../../src/fs-nodes/FirescriptNode')

describe('FirescriptNode', () => {
  describe('getNextNodeType()', () => {
    it('detects an ExportDefaultDeclaration', () => {
      const tokenStack = new TokenStack([
        { 'type': 'keyword', 'value': 'export' },
        { 'type': 'operator', 'value': '**' },
        { 'type': 'identifier', 'value': 'foo' },
        { 'type': 'indention', 'value': 2 }
      ])

      const firescriptNode = new FirescriptNode(tokenStack)
      const definition = firescriptNode.getNextNodeType()
      inspect(definition).isEql('ExportDefaultDeclaration')
    })

    it('detects an ExportAllDeclaration', () => {
      const tokenStack = new TokenStack([
        { 'type': 'keyword', 'value': 'export' },
        { 'type': 'operator', 'value': '*' },
        { 'type': 'identifier', 'value': 'foo' },
        { 'type': 'indention', 'value': 2 }
      ])

      const firescriptNode = new FirescriptNode(tokenStack)
      const definition = firescriptNode.getNextNodeType()
      inspect(definition).isEql('ExportAllDeclaration')
    })

    it('detects an ExportNamedDeclaration', () => {
      const tokenStack = new TokenStack([
        { 'type': 'keyword', 'value': 'export' },
        { 'type': 'identifier', 'value': 'foo' },
        { 'type': 'indention', 'value': 2 }
      ])

      const firescriptNode = new FirescriptNode(tokenStack)
      const definition = firescriptNode.getNextNodeType()
      inspect(definition).isEql('ExportNamedDeclaration')
    })
  })

  describe('createNodeItem()', () => {
    it('creates a identifier node', () => {
      const tokenStack = new TokenStack([
        { 'type': 'identifier', 'value': 'Banana' },
        { 'type': 'indention', 'value': 0 }
      ])

      const fsn = new FirescriptNode(tokenStack, null)
      const node = fsn.createNodeItem(tokenStack)

      inspect(node.toJSON()).isEql({
        type: 'Identifier',
        name: 'Banana'
      })
    })

    it('creates a this node', () => {
      const tokenStack = new TokenStack([
        { 'type': 'identifier', 'value': 'this' },
        { 'type': 'indention', 'value': 0 }
      ])

      const fsn = new FirescriptNode(tokenStack, null)
      const node = fsn.createNodeItem(tokenStack)

      inspect(node.toJSON()).isEql({
        type: 'ThisExpression'
      })
    })

    it('creates a literal node', () => {
      const tokenStack = new TokenStack([
        { 'type': 'literal', 'value': '"Banana"' },
        { 'type': 'indention', 'value': 0 }
      ])

      const fsn = new FirescriptNode(tokenStack, null)
      const node = fsn.createNodeItem(tokenStack)

      inspect(node.toJSON()).isEql({
        type: 'Literal',
        raw: '"Banana"',
        value: 'Banana'
      })
    })

    it('creates a numeric literal node', () => {
      const tokenStack = new TokenStack([
        { 'type': 'numeric', 'value': '123' },
        { 'type': 'indention', 'value': 0 }
      ])

      const fsn = new FirescriptNode(tokenStack, null)
      const node = fsn.createNodeItem(tokenStack)

      inspect(node.toJSON()).isEql({
        type: 'Literal',
        raw: '123',
        value: 123
      })
    })

    it('creates a identifier node on a call expression', () => {
      const tokenStack = new TokenStack([
        { 'type': 'identifier', 'value': 'Banana' },
        { 'type': 'punctuator', 'value': '(' },
        { 'type': 'punctuator', 'value': ')' },
        { 'type': 'indention', 'value': 0 }
      ])

      const fsn = new FirescriptNode(tokenStack, null)
      const node = fsn.createNodeItem(tokenStack)

      inspect(node.toJSON()).isEql({
        type: 'Identifier',
        name: 'Banana'
      })
    })

    it('creates a BlockStatement node', () => {
      const tokenStack = new TokenStack([
        { 'type': 'indention', 'value': 2 },
        { 'type': 'indention', 'value': 0 }
      ])

      const fsn = new FirescriptNode(tokenStack, null)
      fsn.indention = 0
      const node = fsn.createNodeItem(tokenStack)

      inspect(node.toJSON()).isEql({
        type: 'BlockStatement',
        body: []
      })
    })

    it('creates a ImportDeclaration node on a call expression', () => {
      const tokenStack = new TokenStack([
        { 'type': 'keyword', 'value': 'import' },
        { 'type': 'operator', 'value': '**' },
        { 'type': 'identifier', 'value': 'as' },
        { 'type': 'identifier', 'value': 'banana' },
        { 'type': 'identifier', 'value': 'from' },
        { 'type': 'literal', 'value': '"banana"' },
        { 'type': 'indention', 'value': 0 }
      ])

      const fsn = new FirescriptNode(tokenStack, null)
      const node = fsn.createNodeItem(tokenStack)

      inspect(node.toJSON()).isEql({
        type: 'ImportDeclaration',
        specifiers: [{
          type: 'ImportDefaultSpecifier',
          local: {
            type: 'Identifier',
            name: 'banana'
          }
        }],
        source: {
          type: 'Literal',
          raw: '"banana"',
          value: 'banana'
        }
      })
    })

    it('creates a NewExpression node', () => {
      const tokenStack = new TokenStack([
        { 'type': 'keyword', 'value': 'new' },
        { 'type': 'identifier', 'value': 'Banana' },
        { 'type': 'punctuator', 'value': '(' },
        { 'type': 'punctuator', 'value': ')' },
        { 'type': 'indention', 'value': 0 }
      ])

      const fsn = new FirescriptNode(tokenStack, null)
      const node = fsn.createNodeItem(tokenStack)

      inspect(node.toJSON()).isEql({
        type: 'NewExpression',
        arguments: [],
        callee: {
          type: 'Identifier',
          name: 'Banana'
        }
      })
    })
  })

  describe('createFullNode()', () => {
    it('creates a identifier node', () => {
      const tokenStack = new TokenStack([
        { 'type': 'identifier', 'value': 'Banana' },
        { 'type': 'indention', 'value': 0 }
      ])

      const fsn = new FirescriptNode(tokenStack, null)
      const node = fsn.createFullNode(tokenStack)

      inspect(node.toJSON()).isEql({
        type: 'Identifier',
        name: 'Banana'
      })
    })

    it('creates a ExpressionStatement node', () => {
      const tokenStack = new TokenStack([
        { 'type': 'identifier', 'value': 'one' },
        { 'type': 'operator', 'value': '=' },
        { 'type': 'numeric', 'value': '1' },
        { 'type': 'indention', 'value': 0 }
      ])

      const fsn = new FirescriptNode(tokenStack, null)
      const node = fsn.createFullNode(tokenStack)

      inspect(node.toJSON()).isEql({
        type: 'ExpressionStatement',
        expression: {
          type: 'AssignmentExpression',
          left: {
            type: 'Identifier',
            name: 'one'
          },
          right: {
            type: 'Literal',
            raw: '1',
            value: 1
          },
          operator: '='
        }
      })
    })

    it('creates a MemberExpression node', () => {
      const tokenStack = new TokenStack([
        { 'type': 'identifier', 'value': 'Banana' },
        { 'type': 'punctuator', 'value': '.' },
        { 'type': 'identifier', 'value': 'isFruit' },
        { 'type': 'operator', 'value': '=' },
        { 'type': 'identifier', 'value': 'true' },
        { 'type': 'indention', 'value': 0 }
      ])

      const fsn = new FirescriptNode(tokenStack, null)
      const node = fsn.createFullNode(tokenStack)

      inspect(node.toJSON()).isEql({
        type: 'ExpressionStatement',
        expression: {
          type: 'AssignmentExpression',
          left: {
            type: 'MemberExpression',
            computed: false,
            object: {
              name: 'Banana',
              type: 'Identifier'
            },
            property: {
              name: 'isFruit',
              type: 'Identifier'
            }
          },
          right: {
            type: 'Identifier',
            name: 'true'
          },
          operator: '='
        }
      })
    })

    it('creates a CallExpression node', () => {
      const tokenStack = new TokenStack([
        { 'type': 'identifier', 'value': 'banana' },
        { 'type': 'punctuator', 'value': '(' },
        { 'type': 'numeric', 'value': '1' },
        { 'type': 'punctuator', 'value': ')' },
        { 'type': 'indention', 'value': 0 }
      ])

      const fsn = new FirescriptNode(tokenStack, null)
      const node = fsn.createFullNode(tokenStack)

      inspect(node.toJSON()).isEql({
        type: 'CallExpression',
        callee: {
          type: 'Identifier',
          name: 'banana'
        },
        arguments: [{
          type: 'Literal',
          raw: '1',
          value: 1
        }]
      })
    })
  })
})
