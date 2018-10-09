module.exports = {
  KEYWORDS: [
    'async', 'await', 'break', 'case', 'catch', 'class', 'const',
    'continue', 'debugger', 'default', 'do',
    'elif', 'else', 'export', 'extends', 'for', 'func', 'gen',
    'if', 'import', 'log',
    'let', 'new', 'return', 'switch', 'try', 'throw',
    'var', 'while', 'yield'
  ],
  OPERATORS: [
    '!==', '!=', '!', '%=', '%', '&&', '&=', '&', '**', '*=', '*',
    '++', '+=', '+', '--', '-=', '-', '/=', '/', '<<=', '<<', '<=',
    '<', '=>', '===', '==', '=', '>>>=', '>>>', '>>=', '>>', '>=', '>',
    '^=', '^', '|=', '||', '~', 'delete', 'void', 'typeof'
  ],
  PUNCTUATORS: [
    '...', '.', '=', '(', ')', '{', '}', '[', ']', ',', ':', ';', '?'
  ],
  BINARY_OPERATORS: [
    'instanceof', 'in', '+', '-', '*', '/', '%', '**',
    '|', '^', '&', '==', '!=', '===', '!==',
    '<', '>', '>=', '<=', '<<', '>>', '>>>'
  ],
  UPDATE_OPERATORS: ['++', '--'],
  UNARY_OPERATORS: [
    '+', '-', '~', '!', 'delete', 'void', 'typeof'
  ],
  ASSIGNMENT_OPERATORS: [
    '=', '*=', '**=', '/=', '%=', '+=', '-=',
    '<<=', '>>=', '>>>=', '&=', '^=', '|='
  ],
  LOGICAL_OPERATORS: [
    '||', '&&'
  ],
  BLOCK_SCOPE_WRAP_EXPRESSIONS: [
    'UpdateExpression',
    'CallExpression',
    'AwaitExpression',
    'YieldExpression',
    'ArrowFunctionExpression',
    'TemplateLiteral',
    'TaggedTemplateExpression',
    'ConditionalExpression',
    'ObjectExpression'
  ],
  LITERAL_PATTERN: '(?:\'[^]*?(?:\\$\\{[^]+?\\}[^]*?)*?\')|"[^]+?"|true|false|null', // eslint-disable-line no-template-curly-in-string
  NUMERIC_PATTERN: '-?\\d+',
  COMMENT_PATTERN: '#.*',
  BLOCK_COMMENT_PATTERN: '\\/\\*[^]*?\\*\\/',
  REGEXP_PATTERN: '\\/.+?\\/(?:[gimsy]+)?'
}
