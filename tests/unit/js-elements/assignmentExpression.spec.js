const inspect = require('inspect.js')
const AssignmentExpression = require('../../../src/js-elements/AssignmentExpression')
const RenderContext = require('../../../src/RenderContext')

describe('JSElements', () => {
  describe('AssignmentExpression', () => {
    it('renders an AssignmentExpression element', () => {
      const ast = require('../../fixtures/ast/assignmentExpression.json')
      const ctx = new RenderContext()

      const jse = new AssignmentExpression(ast)
      inspect(jse.toESString(ctx)).isEql(
        'num += 1'
      )
    })
  })
})
