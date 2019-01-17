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
        { type: 'identifier', value: null },
        { type: 'punctuator', value: '(' }
      ])
    })

    it('parse definition pattern with an array item', () => {
      const definitionPattern = 'identifier [static,async] > identifier > punctuator "("'

      const definition = NodeDefinitions.parse(definitionPattern)
      inspect(definition).isObject()
      inspect(definition.test).isFunction()
      inspect(definition.mapping).isEql([
        { type: 'identifier', value: ['static', 'async'] },
        { type: 'identifier', value: null },
        { type: 'punctuator', value: '(' }
      ])
    })

    it('parse definition pattern with a regexp item', () => {
      const definitionPattern = 'identifier /^(gen|func|async)$/ > identifier > punctuator "("'

      const definition = NodeDefinitions.parse(definitionPattern)
      inspect(definition).isObject()
      inspect(definition.test).isFunction()
      inspect(definition.mapping).isEql([
        { type: 'identifier', value: /^(gen|func|async)$/ },
        { type: 'identifier', value: null },
        { type: 'punctuator', value: '(' }
      ])
    })

    it('split not on ecaped ">" chars', () => {
      const definitionPattern = 'identifier > identifier ">" > punctuator "("'

      const definition = NodeDefinitions.parse(definitionPattern)
      inspect(definition).isObject()
      inspect(definition.test).isFunction()
      inspect(definition.mapping).isEql([
        { type: 'identifier', value: null },
        { type: 'identifier', value: '>' },
        { type: 'punctuator', value: '(' }
      ])
    })

    it('split not on arrays', () => {
      const definitionPattern = 'identifier > identifier [>] > punctuator "("'

      const definition = NodeDefinitions.parse(definitionPattern)
      inspect(definition).isObject()
      inspect(definition.test).isFunction()
      inspect(definition.mapping).isEql([
        { type: 'identifier', value: null },
        { type: 'identifier', value: ['>'] },
        { type: 'punctuator', value: '(' }
      ])
    })

    it('split not on regexps', () => {
      const definitionPattern = 'identifier > identifier />/ > punctuator "("'

      const definition = NodeDefinitions.parse(definitionPattern)
      inspect(definition).isObject()
      inspect(definition.test).isFunction()
      inspect(definition.mapping).isEql([
        { type: 'identifier', value: null },
        { type: 'identifier', value: />/ },
        { type: 'punctuator', value: '(' }
      ])
    })
  })

  describe('parse()', () => {
    it('return a sorted node mapping array', () => {
      const nodeDefinitions = {
        nodes: {
          'identifier': { name: 'TestOne' },
          'identifier > itentifier': { name: 'TestTwo' }
        }
      }

      const nodeMappings = NodeDefinitions.parseDefinitions(nodeDefinitions)
      inspect(nodeMappings[0].name).isEql('TestTwo')
      inspect(nodeMappings[1].name).isEql('TestOne')
    })

    it('it sorts key+value mappings higher', () => {
      const nodeDefinitions = {
        nodes: {
          'identifier': { name: 'TestOne' },
          'identifier "test"': { name: 'TestTwo' }
        }
      }

      const nodeMappings = NodeDefinitions.parseDefinitions(nodeDefinitions)
      inspect(nodeMappings[0].name).isEql('TestTwo')
      inspect(nodeMappings[1].name).isEql('TestOne')
    })

    it('it sorts nested key+value mappings higher', () => {
      const nodeDefinitions = {
        nodes: {
          'identifier': { name: 'TestOne' },
          'identifier > identifier': { name: 'TestTwo' },
          'identifier > identifier "test"': { name: 'TestThree' }
        }
      }

      const nodeMappings = NodeDefinitions.parseDefinitions(nodeDefinitions)
      inspect(nodeMappings[0].name).isEql('TestThree')
      inspect(nodeMappings[1].name).isEql('TestTwo')
      inspect(nodeMappings[2].name).isEql('TestOne')
    })

    it('it sorts nested key+value mappings higher', () => {
      const nodeDefinitions = {
        nodes: {
          'identifier': { name: 'TestOne' },
          'identifier "test" > identifier': { name: 'TestTwo' },
          'identifier "test" > identifier "test"': { name: 'TestThree' }
        }
      }

      const nodeMappings = NodeDefinitions.parseDefinitions(nodeDefinitions)
      inspect(nodeMappings[0].name).isEql('TestThree')
      inspect(nodeMappings[1].name).isEql('TestTwo')
      inspect(nodeMappings[2].name).isEql('TestOne')
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
