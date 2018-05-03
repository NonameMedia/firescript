const inspect = require('inspect.js')
const AssignmentExpression = require('../../../src/fs-elements/AssignmentExpression')
const RenderContext = require('../../../src/RenderContext')

describe.skip('FireScriptElements', () => {
  describe('AssignmentExpression', () => {
    it('renders an AssignmentExpression element', () => {
      const ast = require('../../fixtures/ast/assignmentExpression.json')
      const ctx = new RenderContext(null, 'fire')

      const jse = new AssignmentExpression(ast)
      inspect(jse.toFSString(ctx)).isEql(
        'num += 1'
      )
    })
  })
})
