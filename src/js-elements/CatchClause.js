const JSElement = require('./JSElement')

/**
 * CatchClause
 *
 * @class CatchClause
 * @extends JSElement
 *
 * interface CatchClause {
 *   type: 'CatchClause';
 *   param: Identifier | BindingPattern;
 *   body: BlockStatement;
 * }
 */
class CatchClause extends JSElement {
  constructor (ast) {
    super(ast)

    this.param = this.createElement(ast.param)
    this.body = this.createElement(ast.body)
  }

  compile (buffer) {
    buffer.registerItem(this.location, 'catch')
    buffer.write('catch (')
    buffer.write(this.param)
    buffer.write(') ')
    buffer.write(this.body)
  }

  toESString (ctx) {
    return this.renderElement(
      'catch (' +
      this.param.toESString(ctx) +
      ') ' +
      this.body.toESString(ctx)
    )
  }
}

module.exports = CatchClause
