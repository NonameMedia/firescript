const path = require('path')
const inspect = require('inspect.js')
const sinon = require('sinon')
inspect.useSinon(sinon)

const TokenBuffer = require('../../src/TokenBuffer')
const NodeDefinition = require('../../src/NodeDefinition')

describe('NodeDefinition', () => {
  describe('parse()', () => {
    it('parse an identifier definition pattern', () => {
      const nodeDefinition = new NodeDefinition({
        confDir: path.join(__dirname, './fixtures/parser/')
      })

      const res = nodeDefinition.parse('identifier')
      inspect(res).isEql({
        mapping: [{
          type: 'identifier',
          value: null,
          global: false
        }],
        test: inspect.match.func
      })
    })

    it('parse an identifier definition pattern with value', () => {
      const nodeDefinition = new NodeDefinition({
        confDir: path.join(__dirname, './fixtures/parser/')
      })

      const res = nodeDefinition.parse('identifier "banana"')
      inspect(res).isEql({
        mapping: [{
          type: 'identifier',
          value: 'banana',
          global: false
        }],
        test: inspect.match.func
      })
    })

    it('parse an nested identifier definition pattern with value', () => {
      const nodeDefinition = new NodeDefinition({
        confDir: path.join(__dirname, './fixtures/parser/')
      })

      const res = nodeDefinition.parse('identifier > identifier "banana"')
      inspect(res).isEql({
        mapping: [{
          type: 'identifier',
          value: null,
          global: false
        }, {
          type: 'identifier',
          value: 'banana',
          global: false
        }],
        test: inspect.match.func
      })
    })

    it('parse an deep nested identifier definition pattern with value', () => {
      const nodeDefinition = new NodeDefinition({
        confDir: path.join(__dirname, './fixtures/parser/')
      })

      const res = nodeDefinition.parse('identifier >> identifier "banana"')
      inspect(res).isEql({
        mapping: [{
          type: 'identifier',
          value: null,
          global: false
        }, {
          type: 'identifier',
          value: 'banana',
          global: true
        }],
        test: inspect.match.func
      })
    })
  })

  describe('resolve()', () => {
    it('resolve an identifier definition pattern', () => {
      const nodeDefinition = new NodeDefinition({
        confDir: path.join(__dirname, './fixtures/parser/')
      })

      const tokenBuffer = new TokenBuffer()
      tokenBuffer.push({
        type: 'identifier',
        value: 'banana'
      })

      const res = nodeDefinition.resolve(tokenBuffer)
      console.log('RES', res)
      inspect(res).isString()
      inspect(res).isEql('Banana')
    })

    it('resolve an identifier definition pattern with a global matcher', () => {
      const nodeDefinition = new NodeDefinition({
        confDir: path.join(__dirname, './fixtures/parser/')
      })

      const tokenBuffer = new TokenBuffer()
      tokenBuffer.push({
        type: 'identifier',
        value: 'banana'
      }, {
        type: 'operator',
        value: '+'
      }, {
        type: 'identifier',
        value: 'coconut'
      })

      const res = nodeDefinition.resolve(tokenBuffer)
      console.log('RES', res)
      inspect(res).isString()
      inspect(res).isEql('Banana')
    })
  })
})
