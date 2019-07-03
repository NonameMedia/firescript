const KEYWORDS = [
  'async', 'await', 'break', 'case', 'catch', 'class', 'const',
  'continue', 'debugger', 'default', 'do',
  'elif', 'else', 'export', 'extends', 'for', 'func', 'gen',
  'if', 'import', 'log',
  'let', 'new', 'return', 'switch', 'try', 'throw',
  'var', 'while', 'yield'
]

const OPERATORS = [
  '!==', '!=', '!', '%=', '%', '&&', '&=', '&', '**', '*=', '*',
  '++', '+=', '+', '--', '-=', '-', '/=', '/', '<<=', '<<', '<=',
  '<', '=>', '===', '==', '=', '>>>=', '>>>', '>>=', '>>', '>=', '>',
  '^=', '^', '|=', '||', '~', 'delete', 'void', 'typeof'
]

const PUNCTUATORS = [
  '...', '.', '(', ')', '{', '}', '[', ']', ',', ':', ';', '?'
]

function escapeReg (reg) {
  return reg.replace(/[.^$*+?()[{\\/|]/g, '\\$&')
}

module.exports = {
  confDir: __dirname,
  keyWords: KEYWORDS,

  matcher: [{
    type: 'template',
    pattern: /((?<!\\)'.*\$\{)|(\}.*\$\{)|((?<!\\)\}.*')/,
    escape: '\\'
  }, {
    type: 'literal',
    begin: '\'',
    end: '\'',
    escape: '\\'
  }, {
    type: 'numeric',
    pattern: /(0[bB][01]+)|(0[xX][a-fA-F0-9]+)|(0[oO]\d+)/i
  }, {
    type: 'numeric',
    pattern: /\d+(\.\d+)?(e\d+)?/
  }, {
    type: 'literal',
    pattern: /(true|false|null)/i
  }, {
    type: 'comment',
    begin: /\/\*/,
    end: /\*\//
  }, {
    type: 'literal',
    begin: /\//,
    end: /\/[gmsiy]*/,
    escape: '\\'
  }, {
    type: 'operator',
    pattern: new RegExp(OPERATORS.map((reg) => escapeReg(reg)).join('|'))
  }, {
    type: 'identifier',
    pattern: /\w+/
  }, {
    type: 'punctuator',
    pattern: new RegExp(PUNCTUATORS.map((reg) => escapeReg(reg)).join('|'))
  }, {
    type: 'comment',
    pattern: /#.*/
  }, {
    type: 'indention',
    pattern: /\n\s*/
  }]
}
