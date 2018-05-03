const inspect = require('inspect.js')
const TemplateElement = require('../../../src/fs-elements/TemplateElement')
const RenderContext = require('../../../src/RenderContext')

describe.skip('FireScriptElements', () => {
  describe('TemplateElement', () => {
    it('renders a TemplateElement element, head element', () => {
      const ast = require('../../fixtures/ast/templateElement.json')
      const ctx = new RenderContext(null, 'fire')

      const jse = new TemplateElement(ast)
      jse.head = true
      jse.tail = false
      inspect(jse.toFSString(ctx)).isEql(
        'Hello ${'
      )
    })

    it('renders a TemplateElement element, middle element', () => {
      const ast = require('../../fixtures/ast/templateElement.json')
      const ctx = new RenderContext(null, 'fire')

      const jse = new TemplateElement(ast)
      jse.head = false
      jse.tail = false
      inspect(jse.toFSString(ctx)).isEql(
        '}Hello ${'
      )
    })

    it('renders a TemplateElement element, tail element', () => {
      const ast = require('../../fixtures/ast/templateElement.json')
      const ctx = new RenderContext(null, 'fire')

      const jse = new TemplateElement(ast)
      jse.head = false
      jse.tail = true
      inspect(jse.toFSString(ctx)).isEql(
        '}Hello '
      )
    })

    it('renders a TemplateElement element, head & tail element', () => {
      const ast = require('../../fixtures/ast/templateElement.json')
      const ctx = new RenderContext(null, 'fire')

      const jse = new TemplateElement(ast)
      jse.head = true
      jse.tail = true
      inspect(jse.toFSString(ctx)).isEql(
        'Hello '
      )
    })
  })
})
