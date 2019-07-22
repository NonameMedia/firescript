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
  const proto = methodDefinition.static ? className : ASTCreator.memberExpression(
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

function createProperty (className, method, secondMethod) {
  const getterProto = ASTCreator.memberExpression(
    ASTCreator.identifier('Object'),
    ASTCreator.identifier('defineProperty')
  )

  const methods = [
    ASTCreator.property('init',
      ASTCreator.identifier(method.kind),
      method.value
    )
  ]

  if (secondMethod) {
    methods.push(ASTCreator.property('init',
      ASTCreator.identifier(secondMethod.kind),
      secondMethod.value
    ))
  }

  const args = [
    ASTCreator.memberExpression(
      className,
      ASTCreator.identifier('prototype')
    ),
    ASTCreator.literal(method.key.name),
    ASTCreator.objectExpression(methods)
  ]

  const expression = ASTCreator.callExpression(getterProto, args)
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
    fn ? fn.params : [],
    fn ? fn.body : null
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

  const methods = ast.body.body.concat()
  for (const method of methods) {
    if (method.kind === 'method') {
      childs.push(createClassMethod(id, method))
    } else if (method.kind === 'get' || method.kind === 'set') {
      const secondItem = methods.findIndex((item, index, array) => {
        if (item === method) {
          return false
        }

        if (item.key === method.key && ['get', 'set'].includes(item.kind)) {
          return true
        }

        return false
      })

      let property
      if (secondItem) {
        property = createProperty(id, method, methods.splice(secondItem, 1)[0])
      } else {
        property = createProperty(id, method)
      }

      childs.push(property)
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
