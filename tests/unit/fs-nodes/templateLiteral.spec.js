const inspect = require('inspect.js')
const TokenStack = require('../../../src/TokenStack')
const TemplateLiteral = require('../../../src/fs-nodes/TemplateLiteral')

describe('TemplateLiteral', () => {
  describe('instance', () => {
    it('returns a TemplateLiteral node', () => {
      const tokenStack = new TokenStack([
        { 'type': 'template', 'value': 'Hello `${' },
        { 'type': 'identifier', 'value': 'name' },
        { 'type': 'template', 'value': '}`, whats on?' }
      ])

      const node = new TemplateLiteral(tokenStack)

      inspect(node).isObject()
      inspect(node.type).isEql('TemplateLiteral')
      inspect(node.toJSON()).isEql({
        type: 'TemplateLiteral',
        quasis: [{
          type: 'TemplateElement',
          value: {
            cooked: 'Hello `',
            raw: 'Hello \\`'
          },
          tail: false
        }, {
          type: 'TemplateElement',
          value: {
            cooked: '`, whats on?',
            raw: '\\`, whats on?'
          },
          tail: true
        }],
        expressions: [{
          type: 'Identifier',
          name: 'name'
        }]
      })
    })
  })
})
