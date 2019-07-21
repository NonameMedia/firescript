const JSElement = require('./JSElement')

/**
 * MethodDefinition
 *
 * @class MethodDefinition
 * @extends JSElement
 *
 * interface MethodDefinition {
 *   type: 'MethodDefinition';
 *   key: Expression | null;
 *   computed: boolean;
 *   value: FunctionExpression | null;
 *   kind: 'method' | 'constructor';
 *   static: boolean;
 *   async: boolean;
 * }
 */
class MethodDefinition extends JSElement {
  constructor (ast) {
    super(ast)

    this.key = ast.key ? this.createElement(ast.key) : null
    this.computed = ast.computed
    this.value = this.createElement(ast.value)
    this.kind = ast.kind
    this.static = ast.static
    this.async = ast.async
  }

  compile (buffer) {
    if (this.static || this.async || ['get', 'set', 'constructor'].includes(this.kind)) {
      buffer.registerItem(this.location)
    }

    buffer.write(this.static ? 'static ' : '')
    buffer.write(this.async ? 'async ' : '')
    buffer.write(['get', 'set'].includes(this.kind) ? this.kind + ' ' : '')
    if (this.kind === 'constructor') {
      buffer.write('constructor')
    } else {
      this.key.compile(buffer)
    }

    this.value.compile(buffer)
  }

  toESString (ctx) {
    const key = this.kind === 'constructor'
      ? 'constructor' : this.key.toESString(ctx)

    const staticMethod = this.static ? 'static ' : ''
    const asyncMethod = this.async ? 'async ' : ''
    const kind = ['get', 'set'].includes(this.kind) ? this.kind + ' ' : ''

    return this.renderElement(
      staticMethod +
      asyncMethod +
      kind +
      key +
      this.value.toESString(ctx)
    )
  }
}

module.exports = MethodDefinition
