const inspect = require('inspect.js')
const TokenStack = require('../../src/TokenStack')
const FireScriptNode = require('../../src/fs-nodes/FireScriptNode')

describe('FireScriptNode', () => {
  describe('createNodeItem()', () => {
    it('creates a identifier node', () => {
      const fsn = new FireScriptNode()
      const tokenStack = new TokenStack([
        { 'type': 'identifier', 'value': 'Banana' },
        { 'type': 'indention', 'value': 0 }
      ])

      const node = fsn.createNodeItem(tokenStack)

      inspect(node.toJSON()).isEql({
        type: 'Identifier',
        name: 'Banana'
      })
    })

    it('creates a this node', () => {
      const fsn = new FireScriptNode()
      const tokenStack = new TokenStack([
        { 'type': 'identifier', 'value': 'this' },
        { 'type': 'indention', 'value': 0 }
      ])

      const node = fsn.createNodeItem(tokenStack)

      inspect(node.toJSON()).isEql({
        type: 'ThisExpression'
      })
    })

    it('creates a literal node', () => {
      const fsn = new FireScriptNode()
      const tokenStack = new TokenStack([
        { 'type': 'literal', 'value': '"Banana"' },
        { 'type': 'indention', 'value': 0 }
      ])

      const node = fsn.createNodeItem(tokenStack)

      inspect(node.toJSON()).isEql({
        type: 'Literal',
        raw: '"Banana"',
        value: 'Banana'
      })
    })

    it('creates a numeric literal node', () => {
      const fsn = new FireScriptNode()
      const tokenStack = new TokenStack([
        { 'type': 'numeric', 'value': '123' },
        { 'type': 'indention', 'value': 0 }
      ])

      const node = fsn.createNodeItem(tokenStack)

      inspect(node.toJSON()).isEql({
        type: 'Literal',
        raw: '123',
        value: 123
      })
    })

    it('creates a identifier node on a call expression', () => {
      const fsn = new FireScriptNode()
      const tokenStack = new TokenStack([
        { 'type': 'identifier', 'value': 'Banana' },
        { 'type': 'punctuator', 'value': '(' },
        { 'type': 'punctuator', 'value': ')' },
        { 'type': 'indention', 'value': 0 }
      ])

      const node = fsn.createNodeItem(tokenStack)

      inspect(node.toJSON()).isEql({
        type: 'Identifier',
        name: 'Banana'
      })
    })

    it('creates a BlockStatement node', () => {
      const fsn = new FireScriptNode()
      const tokenStack = new TokenStack([
        { 'type': 'indention', 'value': 2 },
        { 'type': 'indention', 'value': 0 }
      ])

      const node = fsn.createNodeItem(tokenStack)

      inspect(node.toJSON()).isEql({
        type: 'BlockStatement',
        body: []
      })
    })

    it('creates a ImportDeclaration node on a call expression', () => {
      const fsn = new FireScriptNode()
      const tokenStack = new TokenStack([
        { 'type': 'keyword', 'value': 'import' },
        { 'type': 'identifier', 'value': 'banana' },
        { 'type': 'identifier', 'value': 'from' },
        { 'type': 'literal', 'value': '"banana"' },
        { 'type': 'indention', 'value': 0 }
      ])

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
  })

  describe('createFullNode()', () => {
    it('creates a identifier node', () => {
      const fsn = new FireScriptNode()
      const tokenStack = new TokenStack([
        { 'type': 'identifier', 'value': 'Banana' },
        { 'type': 'indention', 'value': 0 }
      ])

      const node = fsn.createFullNode(tokenStack)

      inspect(node.toJSON()).isEql({
        type: 'Identifier',
        name: 'Banana'
      })
    })

    it('creates a ExpressionStatement node', () => {
      const fsn = new FireScriptNode()
      const tokenStack = new TokenStack([
        { 'type': 'identifier', 'value': 'one' },
        { 'type': 'operator', 'value': '=' },
        { 'type': 'numeric', 'value': '1' },
        { 'type': 'indention', 'value': 0 }
      ])

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
      const fsn = new FireScriptNode()
      const tokenStack = new TokenStack([
        { 'type': 'identifier', 'value': 'Banana' },
        { 'type': 'punctuator', 'value': '.' },
        { 'type': 'identifier', 'value': 'isFruit' },
        { 'type': 'operator', 'value': '=' },
        { 'type': 'identifier', 'value': 'true' },
        { 'type': 'indention', 'value': 0 }
      ])

      const node = fsn.createFullNode(tokenStack)

      inspect(node.toJSON()).isEql({
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
      })
    })
  })
})
