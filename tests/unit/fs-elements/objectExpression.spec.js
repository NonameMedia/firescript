const inspect = require('inspect.js')
const ObjectExpression = require('../../../src/fs-elements/ObjectExpression')
const RenderContext = require('../../../src/RenderContext')

describe.skip('FireScriptElements', () => {
  describe('ObjectExpression', () => {
    it('renders a ObjectExpression element', () => {
      const ast = require('../../fixtures/ast/objectExpression.json')
      const ctx = new RenderContext(null, 'fire')

      const jse = new ObjectExpression(ast)
      inspect(jse.toFSString(ctx)).isEql(
        '{ banana: \'Banana\', mango: \'Mango\' }'
      )
    })

    it('renders a ObjectExpression element using multiline syntax', () => {
      const ast = require('../../fixtures/ast/objectExpressionMultiline.json')
      const ctx = new RenderContext(null, 'fire')

      const jse = new ObjectExpression(ast)
      inspect(jse.toFSString(ctx)).isEql(
        '{\n' +
        '  banana: \'Banana\',\n' +
        '  mango: \'Mango\',\n' +
        '  peach: \'Peach\'\n' +
        '}'
      )
    })

    it('renders a ObjectExpression element using multiline syntax if it has a method property', () => {
      const ast = require('../../fixtures/ast/objectExpressionWithMethod.json')
      const ctx = new RenderContext(null, 'fire')

      const jse = new ObjectExpression(ast)
      inspect(jse.toFSString(ctx)).isEql(
        '{\n' +
        '  banana: \'Banana\',\n' +
        '  getFruits () {\n' +
        '    return this;\n' +
        '  }\n' +
        '}'
      )
    })
  })
})