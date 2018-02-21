const inspect = require('inspect.js')
const TokenStack = require('../../../src/TokenStack')
const TemplateElement = require('../../../src/fs-nodes/TemplateElement')

describe('TemplateElement', () => {
  describe('instance', () => {
    it('returns a TemplateElement node', () => {
      const tokenStack = new TokenStack([
        { 'type': 'template', 'value': 'Hello `' },
        { 'type': 'identifier', 'value': 'name' },
        { 'type': 'template', 'value': '\\`, whats on?' }
      ])

      const node = new TemplateElement(tokenStack)

      inspect(node).isObject()
      inspect(node.type).isEql('TemplateElement')
      inspect(node.toJSON()).isEql({
        type: 'TemplateElement',
        value: {
          cooked: 'Hello `',
          raw: 'Hello \\`'
        },
        tail: false
      })
    })
  })
})
