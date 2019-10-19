module.exports = {
  definition: {
    'comment': {
      name: 'Comment'
    },
    'identifier "static" > identifier > punctuator "("': {
      scopes: {
        'ClassBody': 'MethodDefinition'
      }
    },
    'identifier > punctuator "("': {
      scopes: {
        'ClassBody': 'MethodDefinition'
      }
    },
    'identifier "this"': {
      name: 'ThisExpression'
    },
    'identifier "super"': {
      name: 'Super'
    },
    'identifier [str,bool,arr,obj,num] > identifier': {
      scopes: {
        'VariableDeclaration': 'FirescriptTyping'
      }
    },
    'keyword "import"': {
      name: 'ImportDeclaration'
    },
    'keyword "export" > operator "**"': {
      name: 'ExportDefaultDeclaration'
    },
    'keyword "export" > operator "*"': {
      name: 'ExportAllDeclaration'
    },
    'keyword "export"': {
      name: 'ExportNamedDeclaration'
    },
    'keyword "async" > punctuator "("': {
      name: 'ArrowFunctionExpression'
    },
    'keyword "async" > identifier': {
      scopes: {
        'ClassBody': 'MethodDefinition'
      }
    },
    'identifier [get,set] > identifier': {
      scopes: {
        'ClassBody': 'MethodDefinition'
      }
    },
    'identifier "static" > keyword "async" > identifier': {
      scopes: {
        'ClassBody': 'MethodDefinition'
      }
    },
    'keyword [func,async,gen]': {
      scopes: {
        'VariableDeclarator': 'FunctionExpression',
        'Property': 'FunctionExpression'
      },
      name: 'FunctionDeclaration'
    },
    'keyword "class"': {
      scopes: {
        'VariableDeclarator': 'ClassExpression',
        'Property': 'ClassExpression'
      },
      name: 'ClassDeclaration'
    },
    'keyword [var,const,let]': {
      name: 'VariableDeclaration'
    },
    'keyword "return"': {
      name: 'ReturnStatement'
    },
    'keyword "await"': {
      name: 'AwaitExpression'
    },
    'keyword "yield"': {
      name: 'YieldExpression'
    },
    'keyword "new"': {
      name: 'NewExpression'
    },
    'keyword "if"': {
      name: 'IfStatement'
    },
    'keyword "break"': {
      name: 'BreakStatement'
    },
    'keyword "continue"': {
      name: 'ContinueStatement'
    },
    'keyword "switch"': {
      name: 'SwitchStatement'
    },
    'keyword "while"': {
      name: 'WhileStatement'
    },
    'keyword "throw"': {
      name: 'ThrowStatement'
    },
    'keyword "try"': {
      name: 'TryStatement'
    },
    'keyword "do"': {
      name: 'DoWhileStatement'
    },
    'keyword "debugger"': {
      name: 'DebuggerStatement'
    },
    'keyword "for" > identifier > identifier "in"': {
      name: 'ForInStatement'
    },
    'keyword "for" > identifier > identifier "of"': {
      name: 'ForOfStatement'
    },
    'keyword "for"': {
      name: 'ForStatement'
    },
    'keyword "log"': {
      scopes: {
        'ClassBody': 'MethodDefinition',
        'MemberExpression': 'Identifier',
        'Property': 'Identifier',
        'MethodDefinition': 'Identifier'
      },
      name: 'FirescriptLogStatement'
    },
    'identifier': {
      name: 'Identifier'
    },
    'literal': {
      name: 'Literal'
    },
    'template': {
      name: 'TemplateLiteral'
    },
    'numeric': {
      name: 'Literal'
    },
    'punctuator "..."': {
      name: 'SpreadElement',
      scopes: {
        'FunctionDeclaration': 'RestElement',
        'FunctionExpression': 'RestElement'
      }
    },
    'punctuator "{"': {
      name: 'ObjectExpression'
    },
    'punctuator "["': {
      name: 'ArrayExpression'
    },
    'punctuator "("': {
      name: 'FirescriptGrouping'
    },
    // 'punctuator "(" >> punctuator ")" > operator "=>"':
    //  name: 'ArrowFunctionExpression'
    'operator [++,--]': {
      name: 'UpdateExpression'
    },
    'operator [delete,void,typeof]': {
      weight: 1,
      scopes: {
        'ClassBody': 'MethodDefinition',
        'MethodDefinition': 'Identifier',
        'MemberExpression': 'Identifier'
      }
    },
    'operator [+,-,~,!,delete,void,typeof]': {
      name: 'UnaryExpression'
    }
  }
}
