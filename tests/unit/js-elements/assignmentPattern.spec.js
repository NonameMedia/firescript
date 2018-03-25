const inspect = require('inspect.js')
const AssignmentPattern = require('../../../src/js-elements/AssignmentPattern')
const RenderContext = require('../../../src/RenderContext')

describe('JSElements', () => {
  describe('AssignmentPattern', () => {
    it('renders a AssignmentPattern element', () => {
      const ast = require('../../fixtures/ast/assignmentPattern.json')
      const ctx = new RenderContext()

      const jse = new AssignmentPattern(ast)
      inspect(jse.toESString(ctx)).isEql(
        'fruit = \'banana\''
      )
    })
  })
})
