const inspect = require('inspect.js')
const MemberExpression = require('../../../src/fs-elements/MemberExpression')
const RenderContext = require('../../../src/RenderContext')

describe.skip('FireScriptElements', () => {
  describe('MemberExpression', () => {
    it('renders a MemberExpression element', () => {
      const ast = require('../../fixtures/ast/memberExpression.json')
      const ctx = new RenderContext(null, 'fire')

      const jse = new MemberExpression(ast)
      inspect(jse.toFSString(ctx)).isEql(
        'console.log'
      )
    })
  })
})
