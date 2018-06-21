const ASTCreator = require('../../utils/ASTCreator')

/**
 * Creates a typing call expression node
 *
 * @module typing
 * @returns func
 * @arg str name Typing name
 * @arg str value Value to get typed
 *
 * @example
 * __FS.typing(name, value)
 */

function getTypingExpression (typing) {
  switch (typing.name) {
    case 'num': return ASTCreator.memberExpression('__FS', 'TYPE_NUM')
    case 'str': return ASTCreator.memberExpression('__FS', 'TYPE_STR')
    case 'arr': return ASTCreator.memberExpression('__FS', 'TYPE_ARR')
    case 'obj': return ASTCreator.memberExpression('__FS', 'TYPE_OBJ')
    case 'red': return ASTCreator.memberExpression('__FS', 'TYPE_REG')
    case 'bool': return ASTCreator.memberExpression('__FS', 'TYPE_BOOL')
    default: return typing
  }
}
module.exports = (typing, value) => {
  return ASTCreator.callExpression(
    ASTCreator.memberExpression(
      ASTCreator.identifier('__FS'),
      ASTCreator.identifier('typing')
    ),
    [
      getTypingExpression(typing),
      value
    ]
  )
}
