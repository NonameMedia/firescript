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
    const value = typeof rawValue === 'string'
      ? rawValue.replace(/^'|'$/g, '')
      : rawValue

    return {
      type: 'Literal',
      value: value,
      raw: rawValue.toString()
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

  static logicalExpression (operator, left, right) {
    return {
      type: 'LogicalExpression',
      operator,
      left,
      right
    }
  }

  static binaryExpression (operator, left, right) {
    return {
      type: 'BinaryExpression',
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

  static functionDeclaration (id, params, body) {
    return {
      type: 'FunctionDeclaration',
      id,
      params: params || [],
      body,
      generator: false,
      async: false,
      expression: false
    }
  }

  static thisExpression () {
    return {
      type: 'ThisExpression'
    }
  }
}

module.exports = ASTCreator
