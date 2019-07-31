const JSElement = require('./JSElement')

const ALLOWED_KEY_NODES = [ 'Identifier', 'Literal' ]
const ALLOWED_VALUE_NODES = [
  'AssignmentPattern', 'Identifier', 'ArrayPattern',
  'ObjectPattern',
  'ArrowFunctionExpression', 'FunctionExpression', 'null',
  'Literal', 'ArrayExpression', 'ObjectExpression',
  'TemplateLiteral', 'CallExpression', 'MemberExpression', 'LogicalExpression',
  'BinaryExpression', 'ConditionalExpression', 'UnaryExpression'
]

/**
 * Property
 *
 * @class Property
 * @extends JSElement
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
class Property extends JSElement {
  constructor (ast) {
    super(ast)

    this.key = this.createElement(ast.key, ALLOWED_KEY_NODES)
    this.value = this.createElement(ast.value, ALLOWED_VALUE_NODES)
    this.kind = ast.kind
    this.method = ast.method
    this.shorthand = ast.shorthand
  }

  compile (buffer) {
    if (this.shorthand) {
      buffer.write(this.key)
      return
    }

    if (this.method) {
      buffer.write(this.key)
      buffer.write(this.value)
      return
    }

    const kind = this.kind === 'init' ? '' : ' ' + this.kind

    buffer.write(kind)
    buffer.write(this.key)
    buffer.write(': ')
    buffer.write(this.value)
  }

  toESString (ctx) {
    if (this.shorthand) {
      return this.renderElement(
        this.key.toESString(ctx)
      )
    }

    const kind = this.kind === 'init' ? '' : ' ' + this.kind

    if (this.method) {
      return this.renderElement(
        this.key.toESString(ctx) +
        this.value.toESString(ctx)
      )
    }

    return this.renderElement(
      kind +
      this.key.toESString(ctx) +
      ': ' +
      this.value.toESString(ctx)
    )
  }
}

module.exports = Property
