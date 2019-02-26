const inspect = require('inspect.js')
const sinon = require('sinon')
inspect.useSinon(sinon)

const Comment = require('../../../src/js-elements/Comment')
const SourceBuffer = require('../../../src/SourceBuffer')

describe('Comment', () => {
  describe('compile()', () => {
    it('renders a line comment', () => {
      const ast = {
        type: 'Line',
        value: ' Just a comment'
      }

      const buffer = new SourceBuffer()
      const el = new Comment(ast)

      el.compile(buffer)
      inspect(buffer.toString()).isEql('// Just a comment')
    })

    it('renders a block comment', () => {
      const ast = {
        type: 'Block',
        value: ' Just a comment '
      }

      const buffer = new SourceBuffer()
      const el = new Comment(ast)

      el.compile(buffer)
      inspect(buffer.toString()).isEql('/* Just a comment */')
    })
  })

  describe('getLineLength()', () => {
    it('returns length of a line comment', () => {
      const ast = {
        type: 'Line',
        value: ' Just a comment'
      }

      const el = new Comment(ast)
      inspect(el.getLineLength()).isEql(17)
    })

    it('returns length of a block comment', () => {
      const ast = {
        type: 'Block',
        value: ' Just a comment '
      }

      const el = new Comment(ast)
      inspect(el.getLineLength()).isEql(20)
    })
  })
})
