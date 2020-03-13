module.exports = {
  mapping: {
    'Identifier > punctuator "."': {
      name: 'MemberExpression'
    },
    'Identifier > indention ">=" > punctuator "."': {
      name: 'MemberExpression'
    },
    'Identifier > punctuator "["': {
      name: 'MemberExpression'
    },
    'FunctionExpression > punctuator "."': {
      name: 'MemberExpression'
    },
    'ThisExpression > punctuator "."': {
      name: 'MemberExpression'
    },
    'ThisExpression > punctuator "["': {
      name: 'MemberExpression'
    },
    'ArrayExpression > punctuator "."': {
      name: 'MemberExpression'
    },
    'ObjectExpression > punctuator "."': {
      name: 'MemberExpression'
    },
    'Literal > punctuator "."': {
      name: 'MemberExpression'
    },
    'TemplateLiteral > punctuator "."': {
      name: 'MemberExpression'
    },
    'Identifier > punctuator "("': {
      name: 'CallExpression',
      allowNested: true,
      scopes: {
        'NewExpression': '$origin'
      }
    },
    'Identifier > punctuator ":"': {
      scopes: {
        'VariableDeclarator': 'ObjectExpression',
        'Property': 'ObjectExpression'
      }
    },
    'Literal > punctuator ":"': {
      name: 'ObjectExpression',
      scopes: {
        'ConditionalExpression': '$origin'
      }
    },
    'MemberExpression > punctuator "("': {
      name: 'CallExpression',
      allowNested: true,
      scopes: {
        'NewExpression': '$last'
      }
    },
    'CallExpression > punctuator "."': {
      name: 'MemberExpression'
    },
    'CallExpression > indention ">=" > punctuator "."': {
      name: 'MemberExpression'
    },
    'Super > punctuator "("': {
      name: 'CallExpression'
    },
    'operator [=,*=,**=,/=,%=,+=,-=, <<=,>>=,>>>=,&=,^=,|=]': {
      name: 'AssignmentExpression',
      scopes: {
        'FunctionDeclaration': 'AssignmentPattern',
        'FunctionExpression': 'AssignmentPattern'
      }
    },
    'operator [instanceof,in,+,-,*,/,%,**,|,^,&,==,!=,===,!==,<,>,>=,<=,<<,>>,>>>]': {
      name: 'BinaryExpression',
      scopes: {
        'UnaryExpression': '$origin'
      }
    },
    'operator [++,--]': {
      name: 'UpdateExpression'
    },
    'operator [||,&&]': {
      name: 'LogicalExpression',
      allowNested: false
    },
    'punctuator "?"': {
      name: 'ConditionalExpression',
      scopes: {
        'BinaryExpression': '$origin'
      }
    },
    'FirescriptGrouping > operator "=>"': {
      name: 'ArrowFunctionExpression'
    }
  }
}
