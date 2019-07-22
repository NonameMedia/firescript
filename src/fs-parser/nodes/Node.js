class Node {
  constructor (parser, child) {
    const pos = child || parser.getPosition()

    this.type = this.constructor.name
    this.index = pos.index
    this.length = pos.length
    this.line = pos.line
    this.column = pos.column
    this.indention = pos.indention
    // this.parse()
    this.syntaxError = parser.syntaxError.bind(parser)
  }

  isAllowedNode (child, validTokens) {
    const type = child === null ? 'null' : child.type
    if (!validTokens.includes(type)) {
      if (child.type === null) {
        this.syntaxError(`Unexpected EOF`)
      }

      this.syntaxError(`Token ${type} not allowed within a ${this.type}`, child)
    }
  }

  createJSON (ctx, obj) {
    if (this.trailingComments) {
      obj.trailingComments = this.trailingComments.map((item) => item.resolve(ctx))
    }

    if (this.leadingComments) {
      obj.leadingComments = this.leadingComments.map((item) => item.resolve(ctx))
    }

    if (this.innerComments) {
      obj.innerComments = this.innerComments.map((item) => item.resolve(ctx))
    }

    if (ctx.setLocation) {
      obj.loc = {
        start: {
          line: this.line,
          column: this.column
        },
        end: {
          line: this.lineEnd,
          column: this.columnEnd
        }
      }
    }

    if (ctx.setRange) {
      obj.range = [ this.index, this.index + this.length ]
    }

    return obj
  }

  toJSON (ctx) {
    console.log('TOJSON in', this.type)
    return this.resolve(ctx)
  }
}

module.exports = Node
