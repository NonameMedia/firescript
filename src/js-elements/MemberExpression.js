const JSElement = require('./JSElement')

/**
 * MemberExpression
 *
 * @class MemberExpression
 * @extends JSElement
 *
 * interface MemberExpression {
 *   type: 'MemberExpression';
 *   computed: boolean;
 *   object: Expression;
 *   property: Expression;
 * }
 */
class MemberExpression extends JSElement {
  constructor (ast) {
    super(ast)

    this.object = this.createElement(ast.object)
    this.property = this.createElement(ast.property)
    this.computed = ast.computed
    this.__multilineEnabled = false
  }

  compile (buffer) {
    if (this.computed) {
      buffer.write(this.object)
      buffer.write('[')
      buffer.write(this.property)
      buffer.write(']')
    } else if (this.useMultiLine()) {
      buffer.indent(this.isParent('MemberExpression') ? 0 : 1, true)
      buffer.write(this.object)
      buffer.indent()
      buffer.write('.')
      buffer.write(this.property)
    } else {
      buffer.write(this.object)
      buffer.write('.')
      buffer.write(this.property)
    }
  }

  useMultiLine () {
    if (this.isParent('MemberExpression')) {
      return this.__multilineEnabled
    }

    let dept = 1
    let item = this
    while (item.object.type === 'MemberExpression') {
      dept += 1
      item = item.object
    }

    if (dept >= 3) {
      this.__multilineEnabled = true
      let item = this
      while (item.object.type === 'MemberExpression') {
        item = item.object
        item.__multilineEnabled = true
      }

      return true
    }
  }

  getLineLength () {
    return this.property.getLineLength() + this.object.getLineLength() + 1
  }
}

module.exports = MemberExpression
