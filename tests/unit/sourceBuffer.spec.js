const inspect = require('inspect.js')
const sinon = require('sinon')
inspect.useSinon(sinon)

const SourceBuffer = require('../../src/SourceBuffer')

describe.only('SourceBuffer', () => {
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

  describe('toString()', () => {
    it('returns a buffer', () => {
      const buffer = new SourceBuffer()
      buffer.write('test ')
      buffer.write('foo')

      inspect(buffer.toString()).isEql('test foo')
    })
  })
})
