const inspect = require('inspect.js')
const sinon = require('sinon')
inspect.useSinon(sinon)

const SourceBuffer = require('../../src/SourceBuffer')
const Comment = require('../../src/js-elements/Comment')

describe('SourceBuffer', () => {
  describe('class', () => {
    it('returns a instance', () => {
      const buffer = new SourceBuffer()
      inspect(buffer).isObject()
    })
  })

  describe('write()', () => {
    it('writes into the buffer', () => {
      const buffer = new SourceBuffer()
      inspect(buffer.getLocation()).isEql([1, 1])
      buffer.write('test')
      inspect(buffer.getLocation()).isEql([1, 5])

      inspect(buffer.buffer).isEql(['test'])
      inspect(buffer.line = 1)
      inspect(buffer.column = 5)
    })

    it('writes into the buffer, detect line breaks', () => {
      const buffer = new SourceBuffer()
      inspect(buffer.getLocation()).isEql([1, 1])
      buffer.write('test\n  foo')
      inspect(buffer.getLocation()).isEql([2, 6])

      inspect(buffer.buffer).isEql(['test\n  foo'])
      inspect(buffer.line = 2)
      inspect(buffer.column = 6)
    })

    it('writes into the buffer, detect line breaks and leading lines', () => {
      const buffer = new SourceBuffer()
      inspect(buffer.getLocation()).isEql([1, 1])
      buffer.write('test\n  foo\n')
      inspect(buffer.getLocation()).isEql([3, 1])

      inspect(buffer.buffer).isEql(['test\n  foo\n'])
      inspect(buffer.line = 3)
      inspect(buffer.column = 1)
    })

    it('writes into the buffer, continue line', () => {
      const buffer = new SourceBuffer()
      buffer.write('test ')
      buffer.write('foo')
      inspect(buffer.getLocation()).isEql([1, 9])

      inspect(buffer.buffer).isEql(['test ', 'foo'])
      inspect(buffer.line = 1)
      inspect(buffer.column = 9)
    })
  })

  describe.only('writeComments()', () => {
    it('writes into the buffer', () => {
      const buffer = new SourceBuffer()
      buffer.writeComments([new Comment({
        type: 'Block',
        value: 'Test comment'
      })])

      inspect(buffer.toString()).isEql('/*Test comment*/')
      // inspect(buffer.line = 1)
      // inspect(buffer.column = 5)
    })
  })

  describe.only('writeItem()', () => {
    it('writes an item into the buffer', () => {
      const buffer = new SourceBuffer()
      buffer.writeItem({
        compile (buf) {
          buf.write('testelement')
        }
      })

      inspect(buffer.toString()).isEql('testelement')
      // inspect(buffer.line = 1)
      // inspect(buffer.column = 5)
    })

    it('writes an item with one leading comment', () => {
      const buffer = new SourceBuffer()
      buffer.writeItem({
        compile (buf) {
          buf.write('testelement')
        },
        leadingComments: [{
          compile (buf) {
            buf.write('testcomment')
          }
        }]
      })

      inspect(buffer.toString()).isEql('testcomment\ntestelement')
      // inspect(buffer.line = 1)
      // inspect(buffer.column = 5)
    })

    it('writes an item with two leading comments', () => {
      const buffer = new SourceBuffer()
      buffer.writeItem({
        compile (buf) {
          buf.write('testelement')
        },
        leadingComments: [{
          compile (buf) {
            buf.write('testcomment')
          }
        }, {
          compile (buf) {
            buf.write('testcomment')
          }
        }]
      })

      inspect(buffer.toString()).isEql('testcomment\ntestcomment\ntestelement')
      // inspect(buffer.line = 1)
      // inspect(buffer.column = 5)
    })

    it('writes an item with one trailing comment', () => {
      const buffer = new SourceBuffer()
      buffer.writeItem({
        compile (buf) {
          buf.write('testelement')
        },
        trailingComments: [{
          compile (buf) {
            buf.write('testcomment')
          }
        }]
      })

      inspect(buffer.toString()).isEql('testelement\ntestcomment')
      // inspect(buffer.line = 1)
      // inspect(buffer.column = 5)
    })

    it('writes an item with two trailing comments', () => {
      const buffer = new SourceBuffer()
      buffer.writeItem({
        compile (buf) {
          buf.write('testelement')
        },
        trailingComments: [{
          compile (buf) {
            buf.write('testcomment')
          }
        }, {
          compile (buf) {
            buf.write('testcomment')
          }
        }]
      })

      inspect(buffer.toString()).isEql('testelement\ntestcomment\ntestcomment')
      // inspect(buffer.line = 1)
      // inspect(buffer.column = 5)
    })
  })

  describe('toString()', () => {
    it('returns a buffer', () => {
      const buffer = new SourceBuffer()
      buffer.write('test ')
      buffer.write('foo')

      inspect(buffer.toString()).isEql('test foo')
    })
  })
})
