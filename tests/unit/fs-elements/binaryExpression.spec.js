const inspect = require('inspect.js')
const BinaryExpression = require('../../../src/fs-elements/BinaryExpression')
const RenderContext = require('../../../src/RenderContext')

describe.skip('FireScriptElements', () => {
  describe('BinaryExpression', () => {
    it('renders a BinaryExpression element', () => {
      const ast = require('../../fixtures/ast/binaryExpression.json')
      const ctx = new RenderContext(null, 'fire')

      const jse = new BinaryExpression(ast)
      inspect(jse.toFSString(ctx)).isEql(
        'num >= 100'
      )
    })
  })
})
