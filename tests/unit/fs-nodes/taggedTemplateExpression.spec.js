const inspect = require('inspect.js')
const TokenStack = require('../../../src/TokenStack')
const TaggedTemplateExpression = require('../../../src/fs-nodes/TaggedTemplateExpression')

describe('TaggedTemplateExpression', () => {
  describe('instance', () => {
    it('returns a TaggedTemplateExpression node', () => {
      const tokenStack = new TokenStack([
        { 'type': 'identifier', 'value': 'say' },
        { 'type': 'template', 'value': 'Hello `${' },
        { 'type': 'identifier', 'value': 'name' },
        { 'type': 'template', 'value': '}`, whats on?' }
      ])

      const node = new TaggedTemplateExpression(tokenStack)

      inspect(node).isObject()
      inspect(node.type).isEql('TaggedTemplateExpression')
      inspect(node.toJSON()).isEql({
        type: 'TaggedTemplateExpression',
        tag: {
          type: 'Identifier',
          name: 'say'
        },
        quasi: {
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
        }
      })
    })
  })
})
