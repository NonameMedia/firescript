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
    if (typeof name === 'object') { return name }

    return {
      type: 'Identifier',
      name
    }
  }

  static literal (rawValue) {
    if (typeof rawValue === 'object') { return rawValue }

    const value = typeof rawValue === 'string'
      ? rawValue.replace(/^'|'$/g, '')
      : rawValue

    rawValue = typeof rawValue === 'string'
      ? rawValue.replace(/^'?|'?$/g, '\'')
      : rawValue.toString()

    return {
      type: 'Literal',
      value: value,
      raw: rawValue
    }
  }

  static memberExpression (object, property) {
    return {
      type: 'MemberExpression',
      object: typeof object === 'string' ? ASTCreator.identifier(object) : object,
      property: typeof property === 'string' ? ASTCreator.identifier(property) : property,
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

  static importDefaultSpecifier (local) {
    return {
      type: 'ImportDefaultSpecifier',
      local: ASTCreator.identifier(local)
    }
  }

  static importSpecifier (imported, local) {
    return {
      type: 'ImportSpecifier',
      local: ASTCreator.identifier(local),
      imported: ASTCreator.identifier(imported)
    }
  }

  static importDeclaration (declarations, source) {
    const specifiers = declarations.map((declaration) => {
      if (declaration[0] === '**') {
        return ASTCreator.importDefaultSpecifier(declaration[1])
      }
      return ASTCreator.importSpecifier(...declaration)
    })

    return {
      type: 'ImportDeclaration',
      specifiers,
      source: ASTCreator.literal(source)
    }
  }
}

module.exports = ASTCreator
