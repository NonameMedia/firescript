const path = require('path')
const inspect = require('inspect.js')
const sinon = require('sinon')
inspect.useSinon(sinon)

const Parser = require('../../src/Parser')

describe('Parser', () => {
  describe('nextToken()', () => {
    let parser

    before(() => {
      parser = new Parser({
        confDir: path.join(__dirname, '../../src/fs-parser/')
      })

      parser.parse('const banana = \'Banana\'')
    })

    it('returns a identifier item', () => {
      const next = parser.nextToken()
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
      const next = parser.nextToken()
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
      const next = parser.nextToken()
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
      const next = parser.nextToken()
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
        confDir: path.join(__dirname, '../../src/fs-parser/')
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
        confDir: path.join(__dirname, '../../src/fs-parser/')
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
        confDir: path.join(__dirname, '../../src/fs-parser/')
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
        confDir: path.join(__dirname, '../../src/fs-parser/')
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
        confDir: path.join(__dirname, '../../src/fs-parser/')
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
        confDir: path.join(__dirname, '../../src/fs-parser/')
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

  describe('indention token', () => {
    let parser

    before(() => {
      parser = new Parser({
        confDir: path.join(__dirname, '../../src/fs-parser/')
      })

      parser.parse(
        'import\n' +
        '  banana\n'
      )
    })

    it('returns an indention item', () => {
      parser.nextToken()
      const token = parser.nextToken()
      inspect(token).hasProps({
        type: 'indention',
        value: 1,
        index: 7,
        length: 2,
        column: 1,
        line: 2
      })
    })
  })

  describe('checkIndention()', () => {
    it('passes all indention tests', () => {
      const parser = new Parser({
        confDir: path.join(__dirname, '../../src/fs-parser/'),
        indentionSize: 2
      })

      parser.parse(
        'const banana =\n' +
        '  fruit: \'Banana\'\n' +
        '  color: \'yellow\'\n'
      )

      while (true) {
        const token = parser.nextToken()
        if (!token) {
          break
        }
      }
    })

    it('allow double indentions', () => {
      const parser = new Parser({
        confDir: path.join(__dirname, '../../src/fs-parser/'),
        indentionSize: 2
      })

      parser.parse(
        'const banana =\n' +
        '    fruit: \'Banana\'\n' +
        '    color: \'yellow\'\n'
      )

      while (true) {
        const token = parser.nextToken()
        if (!token) {
          break
        }
      }
    })

    it('fail on odd indentions', () => {
      const parser = new Parser({
        confDir: path.join(__dirname, '../../src/fs-parser/'),
        indentionSize: 2
      })

      parser.parse(
        'const banana =\n' +
        '   fruit: \'Banana\'\n' +
        '   color: \'yellow\'\n'
      )

      try {
        while (true) {
          const token = parser.nextToken()
          if (!token) {
            break
          }
        }

        this.fail('Test should fail, but it passed!')
      } catch (err) {
        console.log('ERR', err)
        inspect(err).isInstanceOf(Error)
        inspect(err).doesMatch(/Unexpected indention/)
      }
    })
  })

  describe('nextNode()', () => {
    let parser

    beforeEach(() => {
      parser = new Parser({
        confDir: path.join(__dirname, '../../src/fs-parser/')
      })
    })

    it('returns a VariableDeclaration node', () => {
      parser.parse('const banana = \'Banana\'')
      const next = parser.nextNode()
      const node = next.resolve()
      inspect(node).hasProps({
        type: 'VariableDeclaration',
        kind: 'const'
      })
    })

    it('returns a MemberExpression node', () => {
      parser.parse('fruits.banana = \'Banana\'')
      const next = parser.nextNode()
      inspect.print(next)
      const node = next.resolve()
      inspect.print(node)
      inspect(node).hasProps({
        type: 'MemberExpression',
        object: {
          type: 'Identifier',
          name: 'fruits'
        },
        property: {
          type: 'Identifier',
          name: 'banana'
        }
      })
    })

    it.skip('returns a MemberExpression node', () => {
      parser.parse('tree.fruits.banana = \'Banana\'')
      const next = parser.nextNode()
      inspect.print(next)
      const node = next.resolve()
      inspect.print(node)
      inspect(node).hasProps({
        type: 'MemberExpression',
        object: {
          type: 'MemberExpression',
          object: {
            type: 'Identifier',
            name: 'tree'
          },
          property: {
            type: 'Identifier',
            name: 'fruits'
          }
        },
        property: {
          type: 'Identifier',
          name: 'banana'
        }
      })
    })
  })

  describe.skip('parseMatchString()', () => {
    const parser = new Parser({
      confDir: path.join(__dirname, '../../src/fs-parser/')
    })

    parser.keyWords = ['foo', 'bar', 'bla']

    it('should match a keyword word', () => {
      const reg = parser.parseMatchString('identifier "static"')
      inspect(reg).isEql(/(static)/)
    })

    it('should match a keyword word list', () => {
      const reg = parser.parseMatchString('identifier [get,set]')
      inspect(reg).isEql(/(get|set)/)
    })

    it('should match an identifier', () => {
      const reg = parser.parseMatchString('identifier')
      inspect(reg).isEql(/(\w+)/)
    })

    it('should match a keyword', () => {
      const reg = parser.parseMatchString('keyword')
      inspect(reg).isEql(/(foo|bar|bla)/)
    })
  })

  describe('fillBuffer()', () => {
    it('should fill the buffer with three items', () => {
      const parser = new Parser({
        confDir: path.join(__dirname, '../../src/fs-parser/')
      })

      parser.parse('const banana = \'Banana\'')
      parser.fillBuffer(3)

      inspect(parser.tokenBuffer).isArray()
      inspect(parser.tokenBuffer).hasLength(3)
      inspect(parser.tokenBuffer).getItem(0).hasProps({
        type: 'keyword',
        value: 'const'
      })

      inspect(parser.tokenBuffer).getItem(1).hasProps({
        type: 'identifier',
        value: 'banana'
      })

      inspect(parser.tokenBuffer).getItem(2).hasProps({
        type: 'punctuator',
        value: '='
      })
    })

    it('should never overload the buffer', () => {
      const parser = new Parser({
        confDir: path.join(__dirname, '../../src/fs-parser/')
      })

      parser.parse('const banana = \'Banana\'')
      parser.fillBuffer(7)

      inspect(parser.tokenBuffer).isArray()
      inspect(parser.tokenBuffer).hasLength(4)
      inspect(parser.tokenBuffer).getItem(0).hasProps({
        type: 'keyword',
        value: 'const'
      })

      inspect(parser.tokenBuffer).getItem(1).hasProps({
        type: 'identifier',
        value: 'banana'
      })

      inspect(parser.tokenBuffer).getItem(2).hasProps({
        type: 'punctuator',
        value: '='
      })
    })
  })

  describe('match()', () => {
    let parser

    beforeEach(() => {
      parser = new Parser({
        confDir: path.join(__dirname, '../../src/fs-parser/')
      })

      parser.keyWords = ['foo', 'bar', 'bla']
    })

    it('match an identifier', () => {
      parser.parse('get banana()')
      const match = parser.match('identifier "get" > identifier')
      inspect(match).isTrue()
    })

    it('matches a "=" punctuator', () => {
      parser.parse('= foo')
      const match = parser.match('punctuator "="')
      inspect(match).isTrue()
    })
  })
})
