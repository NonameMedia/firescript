const ASTCreator = require('../utils/ASTCreator')

function findAndReplaceSuperCall (superClass, functionBody) {
  const body = functionBody.body
  for (let i = 0; i < body.length; i++) {
    if (body[i].type === 'ExpressionStatement') {
      if (body[i].expression.type === 'CallExpression' &&
      body[i].expression.callee.type === 'Super') {
        body[i].expression = ASTCreator.callExpression(
          ASTCreator.memberExpression(
            superClass,
            ASTCreator.identifier('call')
          ),
          [ ASTCreator.thisExpression() ].concat(body[i].expression.arguments)
        )
      }
    }
  }

  return functionBody
}

function findConstructor (superClass, classBody) {
  for (const item of classBody.body) {
    if (item.kind === 'constructor') {
      const body = findAndReplaceSuperCall(superClass, item.value.body)
      return {
        body,
        params: item.value.params
      }
    }
  }
}

function createClassMethod (className, methodDefinition) {
  const proto = ASTCreator.memberExpression(
    className,
    ASTCreator.identifier('prototype')
  )

  const left = ASTCreator.memberExpression(
    proto,
    methodDefinition.key
  )

  const right = methodDefinition.value
  right.id = methodDefinition.key

  const expression = ASTCreator.assignmentExpression('=', left, right)
  return ASTCreator.expressionStatement(
    expression
  )
}

function createGetterMethod (className, methodDefinition) {
  console.log('GETTER', methodDefinition)
  const getterProto = ASTCreator.memberExpression(
    className,
    ASTCreator.identifier('defineProperty')
  )

  // const config = ASTCreator.objectExpression([
  //   ASTCreator.property(
  //     ASTCreator.identifier('get'),
  //     methodDefinition.value
  //   )
  // ])

  const expression = ASTCreator.callExpression(getterProto, methodDefinition.key)
  return ASTCreator.expressionStatement(
    expression
  )
}

function handleClassDeclaration (ast) {
  const id = ast.id
  const superClass = ast.superClass
  const fn = findConstructor(superClass, ast.body)

  const childs = []

  childs.push(ASTCreator.functionDeclaration(
    id,
    fn.params,
    fn.body
  ))

  const proto = ASTCreator.memberExpression(
    id,
    ASTCreator.identifier('prototype')
  )

  if (superClass) {
    childs.push(ASTCreator.expressionStatement(
      ASTCreator.assignmentExpression(
        '=',
        proto,
        ASTCreator.callExpression(
          ASTCreator.memberExpression(
            ASTCreator.identifier('Object'),
            ASTCreator.identifier('create')
          ),
          [ ASTCreator.memberExpression(
            superClass,
            ASTCreator.identifier('prototype')
          ) ]
        )
      )
    ))

    childs.push(ASTCreator.expressionStatement(
      ASTCreator.assignmentExpression(
        '=',
        ASTCreator.memberExpression(
          proto,
          ASTCreator.identifier('constructor')
        ),
        superClass
      )
    ))
  }

  for (const method of ast.body.body) {
    if (method.kind === 'method') {
      childs.push(createClassMethod(id, method))
    } else if (method.kind === 'get') {
      childs.push(createGetterMethod(id, method))
    }
  }

  return childs
}

module.exports = (transformer) => {
  if (transformer.test((ctx) => ctx.esClasses === false)) {
    transformer.add('ClassDeclaration', (ast) => {
      return handleClassDeclaration(ast)
    })
  }
}
