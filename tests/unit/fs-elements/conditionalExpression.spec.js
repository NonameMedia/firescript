const inspect = require('inspect.js')
const ConditionalExpression = require('../../../src/fs-elements/ConditionalExpression')
const RenderContext = require('../../../src/RenderContext')

describe.skip('FireScriptElements', () => {
  describe('ConditionalExpression', () => {
    it('renders a ConditionalExpression element using inline syntax', () => {
      const ast = require('../../fixtures/ast/conditionalExpression.json')
      const ctx = new RenderContext(null, 'fire')

      const jse = new ConditionalExpression(ast)
      inspect(jse.toFSString(ctx)).isEql(
        'banana ? \'banana\' : \'pear\''
      )
    })

    it('renders a ConditionalExpression element', () => {
      const ast = require('../../fixtures/ast/conditionalExpression.json')
      const ctx = new RenderContext(null, 'fire')

      const jse = new ConditionalExpression(ast)
      inspect(jse.renderMultiline(ctx)).isEql(
        'banana\n' +
        '  ? \'banana\'\n' +
        '  : \'pear\''
      )
    })
  })
})
