class Node {
  constructor (parser) {
    const pos = this.getPosition()

    this.type = this.constructor.name
    this.index = pos.index
    this.length = pos.length
    this.line = pos.line
    this.column = pos.column
    this.indention = pos.indention
  }

  createJSON (ctx, obj) {
    if (this.trailingComments) {
      obj.trailingComments = this.trailingComments.map((item) => item.toJSON(ctx))
    }

    if (this.leadingComments) {
      obj.leadingComments = this.leadingComments.map((item) => item.toJSON(ctx))
    }

    if (this.innerComments) {
      obj.innerComments = this.innerComments.map((item) => item.toJSON(ctx))
    }

    // if (ctx.setLocation && this.firstToken) {
    //   obj.loc = {
    //     start: this.token.index,
    //     end: this.lastToken ? this.lastToken.loc.end : this.firstToken.loc.end
    //   }
    // }

    // if (ctx.setRange) {
    //   obj.range = [this.firstToken.range[0], this.lastToken.range[1]]
    // }

    return obj
  }
}

module.exports = Node
