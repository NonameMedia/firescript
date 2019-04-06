const path = require('path')
const inspect = require('inspect.js')
const sinon = require('sinon')
inspect.useSinon(sinon)

const Parser = require('../../src/Parser').Parser

describe.only('Parser', () => {
  describe('next()', () => {
    let parser

    before(() => {
      parser = new Parser({
        definitionFile: path.join(__dirname, '../../conf/codeDefinition.cson')
      })

      parser.parse('const banana = \'Banana\'')
    })

    it('returns a identifier item', () => {
      const next = parser.next()
      inspect(next).isEql({
        type: 'keyword',
        value: 'const',
        index: 0,
        length: 5,
        line: 1,
        column: 1
      })
    })

    it('returns an identifier item', () => {
      const next = parser.next()
      inspect(next).isEql({
        type: 'identifier',
        value: 'banana',
        index: 6,
        length: 6,
        line: 1,
        column: 7
      })
    })

    it('returns a punctuator item', () => {
      const next = parser.next()
      inspect(next).isEql({
        type: 'punctuator',
        value: '=',
        index: 13,
        length: 1,
        line: 1,
        column: 14
      })
    })

    it('returns a literal item', () => {
      const next = parser.next()
      inspect(next).isEql({
        type: 'literal',
        value: '\'Banana\'',
        index: 15,
        length: 8,
        line: 1,
        column: 16
      })
    })
  })

  describe('getIdentifier()', () => {
    let parser

    before(() => {
      parser = new Parser({
        definitionFile: path.join(__dirname, '../../conf/codeDefinition.cson')
      })

      parser.parse('banana.getItem()')
    })

    it('returns an identifier item', () => {
      const token = parser.getIdentifier()
      inspect(token).hasProps({
        type: 'identifier',
        value: 'banana'
      })
    })

    it('throws an syntax error if item is not an identifier', () => {
      inspect(parser.getIdentifier.bind(parser)).doesThrow(SyntaxError)
    })
  })

  describe('getKeyword()', () => {
    let parser

    before(() => {
      parser = new Parser({
        definitionFile: path.join(__dirname, '../../conf/codeDefinition.cson')
      })

      parser.parse('const banana = 1')
    })

    it('returns an keyword item', () => {
      const token = parser.getKeyword()
      inspect(token).hasProps({
        type: 'keyword',
        value: 'const'
      })
    })

    it('throws an syntax error if item is not an keyword', () => {
      inspect(parser.getKeyword.bind(parser)).doesThrow(SyntaxError)
    })
  })

  describe('getLiteral()', () => {
    let parser

    before(() => {
      parser = new Parser({
        definitionFile: path.join(__dirname, '../../conf/codeDefinition.cson')
      })

      parser.parse('\'foo\' + foo')
    })

    it('returns an literal item', () => {
      const token = parser.getLiteral()
      inspect(token).hasProps({
        type: 'literal',
        value: '\'foo\''
      })
    })

    it('throws an syntax error if item is not an literal', () => {
      inspect(parser.getLiteral.bind(parser)).doesThrow(SyntaxError)
    })
  })

  describe('getPunctuator()', () => {
    let parser

    before(() => {
      parser = new Parser({
        definitionFile: path.join(__dirname, '../../conf/codeDefinition.cson')
      })

      parser.parse('{ one: 1 }')
    })

    it('returns an punctuator item', () => {
      const token = parser.getPunctuator()
      inspect(token).hasProps({
        type: 'punctuator',
        value: '{'
      })
    })

    it('throws an syntax error if item is not an punctuator', () => {
      inspect(parser.getPunctuator.bind(parser)).doesThrow(SyntaxError)
    })
  })

  describe('getOperator()', () => {
    let parser

    before(() => {
      parser = new Parser({
        definitionFile: path.join(__dirname, '../../conf/codeDefinition.cson')
      })

      parser.parse('-123')
    })

    it('returns an operator item', () => {
      const token = parser.getOperator()
      inspect(token).hasProps({
        type: 'operator',
        value: '-'
      })
    })

    it('throws an syntax error if item is not an operator', () => {
      inspect(parser.getOperator.bind(parser)).doesThrow(SyntaxError)
    })
  })

  describe('getComment()', () => {
    let parser

    before(() => {
      parser = new Parser({
        definitionFile: path.join(__dirname, '../../conf/codeDefinition.cson')
      })

      parser.parse('/* comment */ const foo = bla')
    })

    it('returns an comment item', () => {
      const token = parser.getComment()
      inspect(token).hasProps({
        type: 'comment',
        value: '/* comment */'
      })
    })

    it('throws an syntax error if item is not an comment', () => {
      inspect(parser.getComment.bind(parser)).doesThrow(SyntaxError)
    })
  })
})
