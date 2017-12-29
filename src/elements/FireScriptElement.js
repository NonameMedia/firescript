const SUPPORTED_ELEMENTS = [
  // ArrayPattern | ObjectPattern
  // ThisExpression | Identifier | Literal |
  // ArrayExpression | ObjectExpression | FunctionExpression | ArrowFunctionExpression | ClassExpression |
  // TaggedTemplateExpression | MemberExpression | Super | MetaProperty |
  // NewExpression | CallExpression | UpdateExpression | AwaitExpression | UnaryExpression |
  // BinaryExpression | LogicalExpression | ConditionalExpression |
  // YieldExpression | AssignmentExpression | SequenceExpression
]

class FireScriptElement {
  constructor (ast) {
    this.parent = null
    this.type = ast.type
    this.childs = []
  }

  nextChild (cld) {

  }

  createElement (ast) {
    const elements = require('../fireScriptElements')
    const Factory = elements[ast.type]
    if (!Factory) {
      throw new Error(`Element ${ast.type} not implemented yet or it is invalid!`)
    }

    const child = new Factory(ast)
    child.parent = this
    return child
  }

  appendChild (child) {
    const index = this.childs.push(child)

    if (this.childs.length > 1) {
      this.prevChild = this.childs[this.childs.length - 1]
      this.prevChild.nextChild = child
    }
  }
}

module.exports = FireScriptElement
