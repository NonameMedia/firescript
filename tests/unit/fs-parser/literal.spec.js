const inspect = require('inspect.js')
const sinon = require('sinon')
inspect.useSinon(sinon)

const Parser = require('../../../src/Parser')
const parserConf = require('../../../src/fs-parser/parserConf')

describe('Literal', () => {
  describe('resolveNodeName()', () => {
    let parser

    beforeEach(() => {
      parser = new Parser(parserConf)
    })

    it('resolves a node name from a string', () => {
      parser.parse('\'banana\'')
      const nodeName = parser.resolveNodeName()
      inspect(nodeName).isEql('Literal')
    })

    it('resolves a node name from a positiv number', () => {
      parser.parse('123')
      const nodeName = parser.resolveNodeName()
      inspect(nodeName).isEql('Literal')
    })

    it('resolves a node name from a float number', () => {
      parser.parse('123.45')
      const nodeName = parser.resolveNodeName()
      inspect(nodeName).isEql('Literal')
    })

    it('resolves a node name from a float e number', () => {
      parser.parse('1.2345e6')
      const nodeName = parser.resolveNodeName()
      inspect(nodeName).isEql('Literal')
    })

    it('resolves a node name from a binary number', () => {
      parser.parse('0b010110')
      const nodeName = parser.resolveNodeName()
      inspect(nodeName).isEql('Literal')
    })

    it('resolves a node name from a hex number', () => {
      parser.parse('0xff00d3')
      const nodeName = parser.resolveNodeName()
      inspect(nodeName).isEql('Literal')
    })

    it('resolves a node name from a octal number', () => {
      parser.parse('0o644')
      const nodeName = parser.resolveNodeName()
      inspect(nodeName).isEql('Literal')
    })

    it('resolves a node name from a regexp', () => {
      parser.parse('/a-z/')
      const nodeName = parser.resolveNodeName()
      inspect(nodeName).isEql('Literal')
    })

    it('resolves a node name from a regexp inclusive flags', () => {
      parser.parse('/a-z/g')
      const nodeName = parser.resolveNodeName()
      inspect(nodeName).isEql('Literal')
    })

    it('resolves a node name from a boolean (true)', () => {
      parser.parse('true')
      const nodeName = parser.resolveNodeName()
      inspect(nodeName).isEql('Literal')
    })

    it('resolves a node name from a boolean (false)', () => {
      parser.parse('false')
      const nodeName = parser.resolveNodeName()
      inspect(nodeName).isEql('Literal')
    })

    it('resolves a node name from null', () => {
      parser.parse('null')
      const nodeName = parser.resolveNodeName()
      inspect(nodeName).isEql('Literal')
    })
  })

  describe('createNode()', () => {
    let parser

    beforeEach(() => {
      parser = new Parser(parserConf)
    })

    it('returns an literal item', () => {
      parser.parse('\'banana\'')
      parser.print()
      const node = parser.createNode('Literal')
      inspect(node).hasProps({
        type: 'Literal',
        raw: '\'banana\'',
        value: 'banana'
      })
    })

    it('returns an literal item from a number', () => {
      parser.parse('123')
      const node = parser.createNode('Literal')
      inspect(node).hasProps({
        type: 'Literal',
        raw: '123',
        value: 123
      })
    })

    it('returns an literal item from a float number', () => {
      parser.parse('123.45')
      const node = parser.createNode('Literal')
      inspect(node).hasProps({
        type: 'Literal',
        raw: '123.45',
        value: 123.45
      })
    })

    it('returns an literal item from a float e number', () => {
      parser.parse('1.2345e6')
      const node = parser.createNode('Literal')
      inspect(node).hasProps({
        type: 'Literal',
        raw: '1.2345e6',
        value: 1234500
      })
    })

    it('returns an literal item from a binary number', () => {
      parser.parse('0b010110')
      const node = parser.createNode('Literal')
      inspect(node).hasProps({
        type: 'Literal',
        raw: '0b010110',
        value: 22
      })
    })

    it('returns an literal item from a octal number', () => {
      parser.parse('0o644')
      const node = parser.createNode('Literal')
      inspect(node).hasProps({
        type: 'Literal',
        raw: '0o644',
        value: 420
      })
    })

    it('returns an literal item from a hex number', () => {
      parser.parse('0xffab01')
      const node = parser.createNode('Literal')
      inspect(node).hasProps({
        type: 'Literal',
        raw: '0xffab01',
        value: 16755457
      })
    })

    it('returns an literal item from a uppercase binary number', () => {
      parser.parse('0B010110')
      const node = parser.createNode('Literal')
      inspect(node).hasProps({
        type: 'Literal',
        raw: '0B010110',
        value: 22
      })
    })

    it('returns an literal item from a uppercase octal number', () => {
      parser.parse('0O644')
      const node = parser.createNode('Literal')
      inspect(node).hasProps({
        type: 'Literal',
        raw: '0O644',
        value: 420
      })
    })

    it('returns an literal item from a uppercase hex number', () => {
      parser.parse('0XFFAB01')
      const node = parser.createNode('Literal')
      inspect(node).hasProps({
        type: 'Literal',
        raw: '0XFFAB01',
        value: 16755457
      })
    })

    it('returns an literal item from a regexp', () => {
      parser.parse('/a-z/')
      const node = parser.createNode('Literal')
      inspect(node).hasProps({
        type: 'Literal',
        raw: '/a-z/',
        value: '/a-z/',
        regex: {
          pattern: 'a-z',
          flags: ''
        }
      })
    })

    it('returns an literal item from a regexp with flags', () => {
      parser.parse('/a-z/g')
      const node = parser.createNode('Literal')
      inspect(node).hasProps({
        type: 'Literal',
        raw: '/a-z/g',
        value: '/a-z/g',
        regex: {
          pattern: 'a-z',
          flags: 'g'
        }
      })
    })

    it('returns an literal item from a boolean (true)', () => {
      parser.parse('true')
      const node = parser.createNode('Literal')
      inspect(node).hasProps({
        type: 'Literal',
        raw: 'true',
        value: true
      })
    })

    it('returns an literal item from a boolean (false)', () => {
      parser.parse('false')
      const node = parser.createNode('Literal')
      inspect(node).hasProps({
        type: 'Literal',
        raw: 'false',
        value: false
      })
    })

    it('returns an literal item from null', () => {
      parser.parse('null')
      const node = parser.createNode('Literal')
      inspect(node).hasProps({
        type: 'Literal',
        raw: 'null',
        value: null
      })
    })
  })
})
