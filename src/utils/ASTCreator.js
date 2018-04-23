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

  static expressionStatement (expression) {
    return {
      type: 'ExpressionStatement',
      expression
    }
  }

  static assignmentExpression (operator, left, right) {
    return {
      type: 'AssignmentExpression',
      operator,
      left,
      right
    }
  }

  static objectExpression (properties) {
    return {
      type: 'ObjectExpression',
      properties
    }
  }

  static property (kind, key, value) {
    return {
      type: 'Property',
      kind,
      key,
      value,
      computed: false,
      method: false,
      shorthand: false
    }
  }
}

module.exports = ASTCreator
