const FireScriptElement = require('./FireScriptElement')

/**
 * MethodDefinition
 *
 * @class MethodDefinition
 * @extends FireScriptElement
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
class MethodDefinition extends FireScriptElement {
  constructor (ast) {
    super(ast)

    this.key = ast.key ? this.createElement(ast.key) : null
    this.computed = ast.computed
    this.value = this.createElement(ast.value)
    this.kind = ast.kind
    this.static = ast.static
  }

  toFSString (ctx) {
    const key = this.kind === 'constructor'
      ? 'constructor' : this.key.toFSString(ctx)

    const kind = ['get', 'set'].includes(this.kind) ? this.kind + ' ' : ''

    return this.renderElement(
      kind +
      key +
      ' ' +
      this.value.toFSString(ctx)
    )
  }
}

module.exports = MethodDefinition
