const colorfy = require('colorfy')
const cf = colorfy()

class FSDump {
  constructor () {
    this.indention = 0
  }

  dump (ast) {
    cf.indent(2)
    cf.grey(ast.type)

    const fn = `dump${ast.type}`
    if (this[fn]) {
      this[fn](ast)
    } else {
      this.dumpUnknown(ast)
    }

    cf.__indention -= 2
  }

  dumpAssignmentExpression (ast) {
    cf.txt(': ').orange(ast.operator)
    cf.nl().azure('left: ')
    this.dump(ast.left)

    cf.nl().azure('right: ')
    this.dump(ast.right)
  }

  dumpCallExpression (ast) {
    cf.nl().azure('callee: ')
    this.dump(ast.callee)
    cf.nl().azure('arguments: ')
    for (const item of ast.arguments) {
      this.dump(item)
    }
  }

  dumpExpressionStatement (ast) {
    this.dump(ast.expression)
  }

  dumpIdentifier (ast) {
    cf.txt(': ').orange(ast.name)
  }

  dumpLiteral (ast) {
    cf.txt(': ').llgrey(ast.raw)
  }

  dumpMemberExpression (ast) {
    cf.nl().azure('object: ')
    this.dump(ast.object)
    cf.nl().azure('property: ')
    this.dump(ast.property)
  }

  dumpProgram (ast) {
    for (const item of ast.body) {
      this.dump(item)
    }
  }

  dumpUnknown (ast) {
    cf.red(JSON.stringify(ast, null, '  '))
  }
}

module.exports = function fsDump (ast, indent = 0) {
  const dump = new FSDump()
  dump.dump(ast)
  cf.print()
  // } else if (ast.type === 'AssignmentExpression') {
  //   cf.azure('OPERATOR: ').lime(` ${ast.operator} `).print()
  //   cf.azure('LEFT: ').print()
  //   fsDump(ast.left, indent += 2)
  //   cf.azure('RIGHT: ').print()
  //   fsDump(ast.right, indent += 2)
  // } else if (ast.type === 'MemberExpression') {
  //   cf.azure('OBJECT: ').print()
  //   fsDump(ast.object, indent += 2)
  //   cf.azure('PROPERTY: ').print()
  //   fsDump(ast.property, indent += 2)
  // } else {
  // }
}
