module.exports = {
  KEYWORDS: [
    'async', 'await', 'break', 'class', 'const', 'continue', 'do',
    'elif', 'else', 'export', 'func', 'gen',
    'if', 'import',
    'let', 'return', 'super',
    'var', 'while', 'yield'
  ],
  OPERATORS: [
    '!==', '!=', '!', '%=', '%', '&&', '&=', '&', '**', '*=', '*',
    '++', '+=', '+', '--', '-=', '-', '/=', '/', '<<=', '<<', '<=',
    '<', '===', '==', '=', '>>>=', '>>>', '>>=', '>>', '>=', '>',
    '^=', '^', '|=', '||', '~'
  ],
  PUNCTUATORS: [
    '.', '=', '(', ')', '{', '}', '[', ']', ','
  ],
  BINARY_OPERATORS: [
    'instanceof', 'in', '+', '-', '*', '/', '%', '**',
    '|', '^', '&', '==', '!=', '===', '!==',
    '<', '>', '<=', '<<', '>>', '>>>'
  ],
  UPDATE_OPERATORS: ['++', '--'],
  UNARY_OPERATORS: [
    '+', '-', '~', '!', 'delete', 'void', 'typeof'
  ],
  ASSIGNMENT_OPERATORS: [
    '=', '*=', '**=', '/=', '%=', '+=', '-=',
    '<<=', '>>=', '>>>=', '&=', '^=', '|='
  ]
}
