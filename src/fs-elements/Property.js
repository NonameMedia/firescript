const FireScriptElement = require('./FireScriptElement')

const ALLOWED_KEY_NODES = [ 'Identifier', 'Literal' ]
const ALLOWED_VALUE_NODES = [
  'AssignmentPattern', 'Identifier', 'ArrayPattern',
  'ObjectPattern', 'FunctionExpression', 'null', 'Literal', 'ArrayExpression', 'ObjectExpression'
]

/**
 * Property
 *
 * @class Property
 * @extends FireScriptElement
 *
 * interface Property {
 *   type: 'Property';
 *   key: Identifier | Literal;
 *   computed: boolean;
 *   value: AssignmentPattern | Identifier | BindingPattern | FunctionExpression | null;
 *   kind: 'get' | 'set' | 'init';
 *   method: false;
 *   shorthand: boolean;
 * }
*/
class Property extends FireScriptElement {
  constructor (ast) {
    super(ast)

    this.key = this.createElement(ast.key, ALLOWED_KEY_NODES)
    this.value = this.createElement(ast.value, ALLOWED_VALUE_NODES)
    this.kind = ast.kind
    this.method = ast.method
    this.shorthand = ast.shorthand
  }

  toFSString (ctx) {
    if (this.shorthand) {
      return this.renderElement(
        this.key.toFSString(ctx)
      )
    }

    const kind = this.kind === 'init' ? '' : ' ' + this.kind
    const key = this.key.toFSString(ctx)
    let value = this.value.toFSString(ctx)

    let propertySpacing = ' '
    if (value.startsWith('\n')) {
      propertySpacing = ''
    }

    if (this.method) {
      return this.renderElement(
        key +
        propertySpacing +
        value
      )
    }

    return this.renderElement(
      kind +
      key +
      ':' +
      propertySpacing +
      value
    )
  }
}

module.exports = Property
