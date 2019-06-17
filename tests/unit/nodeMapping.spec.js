const path = require('path')
const inspect = require('inspect.js')
const sinon = require('sinon')
inspect.useSinon(sinon)

const NodeMapping = require('../../src/NodeMapping')

describe.only('Node mappings', () => {
  describe('instance', () => {
    it('initialize and parse a node mapping', () => {
      const nodeMapping = new NodeMapping({
        confDir: path.join(__dirname, './fixtures/parser/')
      })
      console.log('NodeMapping', nodeMapping)
    })
  })
  // describe('parse()', () => {
  //   it('parse mapping pattern', () => {
  //     const mappingPattern = 'Identifier "static" > identifier > punctuator "("'
  //
  //     const mapping = NodeMappings.parse(mappingPattern)
  //     inspect(mapping).isObject()
  //     inspect(mapping.test).isFunction()
  //     inspect(mapping.mapping).isEql([
  //       { type: 'identifier', value: 'static' },
  //       { type: 'identifier', value: null },
  //       { type: 'punctuator', value: '(' }
  //     ])
  //   })
  //
  //   it('parse mapping pattern with an array item', () => {
  //     const mappingPattern = 'identifier [static,async] > identifier > punctuator "("'
  //
  //     const mapping = NodeMappings.parse(mappingPattern)
  //     inspect(mapping).isObject()
  //     inspect(mapping.test).isFunction()
  //     inspect(mapping.mapping).isEql([
  //       { type: 'identifier', value: ['static', 'async'] },
  //       { type: 'identifier', value: null },
  //       { type: 'punctuator', value: '(' }
  //     ])
  //   })
  //
  //   it('parse mapping pattern with a regexp item', () => {
  //     const mappingPattern = 'identifier /^(gen|func|async)$/ > identifier > punctuator "("'
  //
  //     const mapping = NodeMappings.parse(mappingPattern)
  //     inspect(mapping).isObject()
  //     inspect(mapping.test).isFunction()
  //     inspect(mapping.mapping).isEql([
  //       { type: 'identifier', value: /^(gen|func|async)$/ },
  //       { type: 'identifier', value: null },
  //       { type: 'punctuator', value: '(' }
  //     ])
  //   })
  //
  //   it('split not on ecaped ">" chars', () => {
  //     const mappingPattern = 'identifier > identifier ">" > punctuator "("'
  //
  //     const mapping = NodeMappings.parse(mappingPattern)
  //     inspect(mapping).isObject()
  //     inspect(mapping.test).isFunction()
  //     inspect(mapping.mapping).isEql([
  //       { type: 'identifier', value: null },
  //       { type: 'identifier', value: '>' },
  //       { type: 'punctuator', value: '(' }
  //     ])
  //   })
  //
  //   it('split not on arrays', () => {
  //     const mappingPattern = 'identifier > identifier [>] > punctuator "("'
  //
  //     const mapping = NodeMappings.parse(mappingPattern)
  //     inspect(mapping).isObject()
  //     inspect(mapping.test).isFunction()
  //     inspect(mapping.mapping).isEql([
  //       { type: 'identifier', value: null },
  //       { type: 'identifier', value: ['>'] },
  //       { type: 'punctuator', value: '(' }
  //     ])
  //   })
  //
  //   it('split not on regexps', () => {
  //     const mappingPattern = 'identifier > identifier />/ > punctuator "("'
  //
  //     const mapping = NodeMappings.parse(mappingPattern)
  //     inspect(mapping).isObject()
  //     inspect(mapping.test).isFunction()
  //     inspect(mapping.mapping).isEql([
  //       { type: 'identifier', value: null },
  //       { type: 'identifier', value: />/ },
  //       { type: 'punctuator', value: '(' }
  //     ])
  //   })
  // })
  //
  // describe('parse()', () => {
  //   it('return a sorted node mapping array', () => {
  //     const mappingDefinition = {
  //       nodes: {
  //         'identifier': { name: 'TestOne' },
  //         'identifier > itentifier': { name: 'TestTwo' }
  //       }
  //     }
  //
  //     const nodeMappings = NodeMappings.parseDefinitions(mappingDefinition)
  //     inspect(nodeMappings[0].name).isEql('TestTwo')
  //     inspect(nodeMappings[1].name).isEql('TestOne')
  //   })
  //
  //   it('it sorts key+value mappings higher', () => {
  //     const mappingDefinition = {
  //       nodes: {
  //         'identifier': { name: 'TestOne' },
  //         'identifier "test"': { name: 'TestTwo' }
  //       }
  //     }
  //
  //     const nodeMappings = NodeMappings.parseDefinitions(mappingDefinition)
  //     inspect(nodeMappings[0].name).isEql('TestTwo')
  //     inspect(nodeMappings[1].name).isEql('TestOne')
  //   })
  //
  //   it('it sorts nested key+value mappings higher', () => {
  //     const mappingDefinition = {
  //       nodes: {
  //         'identifier': { name: 'TestOne' },
  //         'identifier > identifier': { name: 'TestTwo' },
  //         'identifier > identifier "test"': { name: 'TestThree' }
  //       }
  //     }
  //
  //     const nodeMappings = NodeMappings.parseDefinitions(mappingDefinition)
  //     inspect(nodeMappings[0].name).isEql('TestThree')
  //     inspect(nodeMappings[1].name).isEql('TestTwo')
  //     inspect(nodeMappings[2].name).isEql('TestOne')
  //   })
  //
  //   it('it sorts nested key+value mappings higher', () => {
  //     const mappingDefinition = {
  //       nodes: {
  //         'identifier': { name: 'TestOne' },
  //         'identifier "test" > identifier': { name: 'TestTwo' },
  //         'identifier "test" > identifier "test"': { name: 'TestThree' }
  //       }
  //     }
  //
  //     const nodeMappings = NodeMappings.parseDefinitions(mappingDefinition)
  //     inspect(nodeMappings[0].name).isEql('TestThree')
  //     inspect(nodeMappings[1].name).isEql('TestTwo')
  //     inspect(nodeMappings[2].name).isEql('TestOne')
  //   })
  // })
  //
  // describe('TestNode', () => {
  //   const tokenStack = new TokenStack([
  //     { type: 'identifier', value: 'test' },
  //     { type: 'literal', value: '\'Banana\'' },
  //     { type: 'identifier', value: 'coconut' },
  //     { type: 'punctuator', value: ':' }
  //   ])
  //
  //   it('identifier > "test" shouls pass', () => {
  //     const mapping = NodeMappings.parse('identifier "test"')
  //     inspect(mapping.test(tokenStack)).isTrue()
  //   })
  //
  //   it('identifier > "foo" should fail', () => {
  //     const mapping = NodeMappings.parse('identifier "foo"')
  //     inspect(mapping.test(tokenStack)).isFalse()
  //   })
  //
  //   it('identifier > "test" shouls pass', () => {
  //     const mapping = NodeMappings.parse('identifier "test" > literal')
  //     inspect(mapping.test(tokenStack)).isTrue()
  //   })
  //
  //   it('identifier > "foo" should fail', () => {
  //     const mapping = NodeMappings.parse('identifier "foo" > identifier')
  //     inspect(mapping.test(tokenStack)).isFalse()
  //   })
  //
  //   it('identifier > "test" shouls pass', () => {
  //     const mapping = NodeMappings.parse('identifier "test" > literal > identifier "coconut"')
  //     inspect(mapping.test(tokenStack)).isTrue()
  //   })
  //
  //   it('identifier > "foo" should fail', () => {
  //     const mapping = NodeMappings.parse('identifier "foo" > literal > punctuator ":"')
  //     inspect(mapping.test(tokenStack)).isFalse()
  //   })
  // })
})
