const inspect = require('inspect.js')
const Literal = require('../../../src/fs-nodes/Literal')

describe('Literal', () => {
  describe('instance', () => {
    it('returns a fs-node litteral item of type string', () => {
      const tokenStack = [
        { 'type': 'literal', 'value': '\'bla\'' }
      ]

      const node = new Literal(tokenStack)

      inspect(node).isObject()
      inspect(node.type).isEql('Literal')
      inspect(node.value).isString()
      inspect(node.value).isEql('bla')
      inspect(node.raw).isString()
      inspect(node.raw).isEql('\'bla\'')
    })

    it('returns a fs-node litteral item of type boolean (true)', () => {
      const tokenStack = [
        { 'type': 'literal', 'value': 'true' }
      ]

      const node = new Literal(tokenStack)

      inspect(node).isObject()
      inspect(node.type).isEql('Literal')
      inspect(node.value).isBoolean()
      inspect(node.value).isTrue()
      inspect(node.raw).isString()
      inspect(node.raw).isEql('true')
    })

    it('returns a fs-node litteral item of type boolean (false)', () => {
      const tokenStack = [
        { 'type': 'literal', 'value': 'false' }
      ]

      const node = new Literal(tokenStack)

      inspect(node).isObject()
      inspect(node.type).isEql('Literal')
      inspect(node.value).isBoolean()
      inspect(node.value).isFalse()
      inspect(node.raw).isString()
      inspect(node.raw).isEql('false')
    })

    it('returns a fs-node litteral item of type boolean (null)', () => {
      const tokenStack = [
        { 'type': 'literal', 'value': 'null' }
      ]

      const node = new Literal(tokenStack)

      inspect(node).isObject()
      inspect(node.type).isEql('Literal')
      inspect(node.value).isNull()
      inspect(node.raw).isString()
      inspect(node.raw).isEql('null')
    })

    it('returns a fs-node litteral item of type regexp', () => {
      const tokenStack = [
        { 'type': 'literal', 'value': '/^bla/g' }
      ]

      const node = new Literal(tokenStack)

      inspect(node).isObject()
      inspect(node.type).isEql('Literal')
      inspect(node.value).isString()
      inspect(node.value).isEql('/^bla/g')
      inspect(node.raw).isString()
      inspect(node.raw).isEql('/^bla/g')
      inspect(node.regex).isObject()
      inspect(node.regex).isEql({
        pattern: '^bla',
        flags: 'g'
      })
    })

    it('returns a fs-node litteral item of type number', () => {
      const tokenStack = [
        { 'type': 'numeric', 'value': '123' }
      ]

      const node = new Literal(tokenStack)

      inspect(node).isObject()
      inspect(node.type).isEql('Literal')
      inspect(node.value).isNumber()
      inspect(node.value).isEql(123)
      inspect(node.raw).isString()
      inspect(node.raw).isEql('123')
    })
  })
})
