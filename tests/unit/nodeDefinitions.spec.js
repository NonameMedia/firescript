const inspect = require('inspect.js')
const sinon = require('sinon')
inspect.useSinon(sinon)

const NodeDefinitions = require('../../src/utils/nodeDefinitions')
const TokenStack = require('../../src//TokenStack')

describe('Node definitions', () => {
  describe('parse()', () => {
    it('parse definition pattern', () => {
      const definitionPattern = 'identifier "static" > identifier > punctuator "("'

      const definition = NodeDefinitions.parse(definitionPattern)
      inspect(definition).isObject()
      inspect(definition.test).isFunction()
      inspect(definition.mapping).isEql([
        { type: 'identifier', value: 'static' },
        { type: 'identifier', value: undefined },
        { type: 'punctuator', value: '(' }
      ])
    })
  })

  describe('TestNode', () => {
    const tokenStack = new TokenStack([
      { type: 'identifier', value: 'test' },
      { type: 'literal', value: '\'Banana\'' },
      { type: 'identifier', value: 'coconut' },
      { type: 'punctuator', value: ':' }
    ])

    it('identifier > "test" shouls pass', () => {
      const definition = NodeDefinitions.parse('identifier "test"')
      inspect(definition.test(tokenStack)).isTrue()
    })

    it('identifier > "foo" should fail', () => {
      const definition = NodeDefinitions.parse('identifier "foo"')
      inspect(definition.test(tokenStack)).isFalse()
    })

    it('identifier > "test" shouls pass', () => {
      const definition = NodeDefinitions.parse('identifier "test" > literal')
      inspect(definition.test(tokenStack)).isTrue()
    })

    it('identifier > "foo" should fail', () => {
      const definition = NodeDefinitions.parse('identifier "foo" > identifier')
      inspect(definition.test(tokenStack)).isFalse()
    })

    it('identifier > "test" shouls pass', () => {
      const definition = NodeDefinitions.parse('identifier "test" > literal > identifier "coconut"')
      inspect(definition.test(tokenStack)).isTrue()
    })

    it('identifier > "foo" should fail', () => {
      const definition = NodeDefinitions.parse('identifier "foo" > literal > punctuator ":"')
      inspect(definition.test(tokenStack)).isFalse()
    })
  })
})
