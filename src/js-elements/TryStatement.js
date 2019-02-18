const JSElement = require('./JSElement')

/**
 * TryStatement
 *
 * @class TryStatement
 * @extends JSElement
 *
 * interface TryStatement {
 *   type: 'TryStatement';
 *   block: BlockStatement;
 *   handler: CatchClause | null;
 *   finalizer: BlockStatement | null;
 * }
 */
class TryStatement extends JSElement {
  constructor (ast) {
    super(ast)

    this.block = this.createElement(ast.block)
    this.handler = ast.handler ? this.createElement(ast.handler) : null
    this.finalizer = ast.finalizer ? this.createElement(ast.finalizer) : null
  }

  compile (buffer) {
    buffer.registerItem(this.location, 'try')
    buffer.write('try ')
    buffer.write(this.block)
    buffer.write(' ')
    buffer.write(this.handler)
    buffer.write(this.finalizer)
  }

  toESString (ctx) {
    const finalizer = this.finalizer ? this.finalizer.toESString(ctx) : ''

    return this.renderElement(
      'try ' +
      this.block.toESString(ctx) +
      ' ' +
      this.handler.toESString(ctx) +
      finalizer
    )
  }
}

module.exports = TryStatement
