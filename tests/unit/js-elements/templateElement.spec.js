const inspect = require('inspect.js')
const TemplateElement = require('../../../src/js-elements/TemplateElement')
const RenderContext = require('../../../src/RenderContext')

describe('JSElements', () => {
  describe('TemplateElement', () => {
    it('renders a TemplateElement element, head element', () => {
      const ast = require('../../fixtures/ast/templateElement.json')
      const ctx = new RenderContext()

      const jse = new TemplateElement(ast)
      jse.head = true
      jse.tail = false
      inspect(jse.toESString(ctx)).isEql(
        'Hello ${'
      )
    })

    it('renders a TemplateElement element, middle element', () => {
      const ast = require('../../fixtures/ast/templateElement.json')
      const ctx = new RenderContext()

      const jse = new TemplateElement(ast)
      jse.head = false
      jse.tail = false
      inspect(jse.toESString(ctx)).isEql(
        '}Hello ${'
      )
    })

    it('renders a TemplateElement element, tail element', () => {
      const ast = require('../../fixtures/ast/templateElement.json')
      const ctx = new RenderContext()

      const jse = new TemplateElement(ast)
      jse.head = false
      jse.tail = true
      inspect(jse.toESString(ctx)).isEql(
        '}Hello '
      )
    })

    it('renders a TemplateElement element, head & tail element', () => {
      const ast = require('../../fixtures/ast/templateElement.json')
      const ctx = new RenderContext()

      const jse = new TemplateElement(ast)
      jse.head = true
      jse.tail = true
      inspect(jse.toESString(ctx)).isEql(
        'Hello '
      )
    })
  })
})
