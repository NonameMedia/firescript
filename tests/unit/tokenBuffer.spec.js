const inspect = require('inspect.js')
const sinon = require('sinon')
inspect.useSinon(sinon)

const TokenBuffer = require('../../src/TokenBuffer')

describe('TokenBuffer', () => {
  describe('push()', () => {
    it('Add items to token buffer', () => {
      const tokenBuffer = new TokenBuffer()
      tokenBuffer.push({
        type: 'identifier',
        value: 'banana'
      })

      inspect(tokenBuffer).hasLength(1)
      inspect(tokenBuffer).getItem(0).isEql({
        type: 'identifier',
        value: 'banana'
      })
    })
  })

  describe('match()', () => {
    it('finds an identifier item', () => {
      const tokenBuffer = new TokenBuffer()
      tokenBuffer.push({
        type: 'identifier',
        value: 'banana'
      })

      const res = tokenBuffer.match('identifier')
      inspect(res).isTrue()
    })

    it('does not find a literal item', () => {
      const tokenBuffer = new TokenBuffer()
      tokenBuffer.push({
        type: 'identifier',
        value: 'banana'
      })

      const res = tokenBuffer.match('literal')
      inspect(res).isFalse()
    })

    it('finds an identifier item with value banana', () => {
      const tokenBuffer = new TokenBuffer()
      tokenBuffer.push({
        type: 'identifier',
        value: 'banana'
      })

      const res = tokenBuffer.match('identifier', 'banana')
      inspect(res).isTrue()
    })
  })

  describe('find()', () => {
    it('finds an identifier item with value coconut', () => {
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

      const res = tokenBuffer.find('identifier', 'coconut')
      inspect(res).isEql(2)
    })

    it('does not find an identifier item with value pear', () => {
      const tokenBuffer = new TokenBuffer()
      tokenBuffer.push({
        type: 'identifier',
        value: 'banana'
      }, {
        type: 'operator',
        value: '+'
      }, {
        type: 'identifier',
        value: 'pear'
      })

      const res = tokenBuffer.find('identifier', 'coconut')
      inspect(res).isEql(-1)
    })
  })
})
