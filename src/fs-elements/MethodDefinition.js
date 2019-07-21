const FirescriptElement = require('./FirescriptElement')

/**
 * MethodDefinition
 *
 * @class MethodDefinition
 * @extends FirescriptElement
 *
 * interface MethodDefinition {
 *   type: 'MethodDefinition';
 *   key: Expression | null;
 *   computed: boolean;
 *   value: FunctionExpression | null;
 *   kind: 'method' | 'constructor';
 *   static: boolean;
 * }
 */
class MethodDefinition extends FirescriptElement {
  constructor (ast) {
    super(ast)

    this.key = ast.key ? this.createElement(ast.key) : null
    this.computed = ast.computed
    this.value = this.createElement(ast.value)
    this.kind = ast.kind
    this.static = ast.static
    this.async = this.value.async
    this.value.async = false
  }

  toFSString (ctx) {
    const key = this.kind === 'constructor'
      ? 'constructor' : this.key.toFSString(ctx)

    const staticstr = this.static ? 'static ' : ''
    const asyncstr = this.async ? 'async ' : ''
    const kind = ['get', 'set'].includes(this.kind) ? this.kind + ' ' : ''

    console.log('ASYNC', asyncstr, this)
    return this.renderElement(
      staticstr +
      asyncstr +
      kind +
      key +
      ' ' +
      this.value.toFSString(ctx)
    )
  }
}

module.exports = MethodDefinition
