const JSElement = require('./JSElement')

/**
 * ExportSpecifier
 *
 * @class ExportSpecifier
 * @extends JSElement
 *
 * interface ExportSpecifier {
 *    type: 'ExportSpecifier';
 *    exported: Identifier;
 *    local: Identifier;
 *}
 */
class ExportSpecifier extends JSElement {
  constructor (ast) {
    super(ast)

    this.callee = this.createElement(ast.callee)
    this.arguments = this.createElementList(ast.arguments)
    throw new Error(`Element ExportSpecifier is a DraftElement!`)
  }

  toString () {
    return `${this.callee}(${this.arguments.join(', ')});`
  }
}

module.exports = ExportSpecifier
