const FirescriptElement = require('./FirescriptElement')

/**
 * MemberExpression
 *
 * @class MemberExpression
 * @extends FirescriptElement
 *
 * interface MemberExpression {
 *   type: 'MemberExpression';
 *   computed: boolean;
 *   object: Expression;
 *   property: Expression;
 * }
 */
class MemberExpression extends FirescriptElement {
  constructor (ast) {
    super(ast)

    this.object = this.createElement(ast.object)
    this.property = this.createElement(ast.property)
    this.computed = ast.computed
  }

  toFSString (ctx) {
    if (this.computed) {
      return this.renderElement(
        this.object.toFSString(ctx) +
        '[' +
        this.property.toFSString(ctx) +
        ']'
      )
    } else {
      return this.renderElement(
        this.object.toFSString(ctx) +
        '.' +
        this.property.toFSString(ctx)
      )
    }
  }
}

module.exports = MemberExpression
