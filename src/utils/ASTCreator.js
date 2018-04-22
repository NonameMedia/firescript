class ASTCreator {
  static variableDeclaration (kind, declarations) {
    return {
      type: 'VariableDeclaration',
      declarations,
      kind: kind || 'var'
    }
  }

  static variableDeclarator (id, init) {
    return {
      type: 'VariableDeclarator',
      id,
      init
    }
  }

  static callExpression (callee, args) {
    return {
      type: 'CallExpression',
      callee,
      arguments: args || []
    }
  }

  static identifier (name) {
    return {
      type: 'Identifier',
      name
    }
  }

  static literal (rawValue) {
    const value = rawValue.replace(/^'|'$/, '')

    return {
      type: 'literal',
      value: value,
      raw: rawValue
    }
  }

  static memberExpression (object, property) {
    return {
      type: 'MemberExpression',
      object,
      property,
      computed: false
    }
  }
}

module.exports = ASTCreator
