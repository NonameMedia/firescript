const inspect = require('inspect.js')
const AssignmentPattern = require('../../../src/fs-elements/AssignmentPattern')
const RenderContext = require('../../../src/RenderContext')

describe.skip('FireScriptElements', () => {
  describe('AssignmentPattern', () => {
    it('renders a AssignmentPattern element', () => {
      const ast = require('../../fixtures/ast/assignmentPattern.json')
      const ctx = new RenderContext(null, 'fire')

      const jse = new AssignmentPattern(ast)
      inspect(jse.toFSString(ctx)).isEql(
        'fruit = \'banana\''
      )
    })
  })
})
