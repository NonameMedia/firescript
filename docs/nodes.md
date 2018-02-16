FS Node
-------


ArrayPattern
RestElement
AssignmentPattern
ObjectPattern
ThisExpression                        [ (x) Unittest (-) Parser (-) Transpiler ]
Identifier                            [ (x) Unittest (x) Parser (-) Transpiler ]
Literal                               [ (x) Unittest (x) Parser (-) Transpiler ]
ArrayExpression                       [ (x) Unittest (-) Parser (-) Transpiler ]
ObjectExpression                      [ (x) Unittest (-) Parser (-) Transpiler ]
Property                              [ (x) Unittest (-) Parser (-) Transpiler ]
FunctionExpression                    [ (x) Unittest (-) Parser (-) Transpiler ]
ArrowFunctionExpression               [ (x) Unittest (-) Parser (-) Transpiler ]
ClassExpression                       [ (x) Unittest (-) Parser (-) Transpiler ]
ClassBody                             [ (x) Unittest (-) Parser (-) Transpiler ]
MethodDefinition                      [ (x) Unittest (-) Parser (-) Transpiler ]
TaggedTemplateExpression
TemplateElement
TemplateLiteral
MemberExpression                      [ (x) Unittest (-) Parser (-) Transpiler ]
Super                                 [ (x) Unittest (-) Parser (-) Transpiler ]
MetaProperty
CallExpression                        [ (x) Unittest (-) Parser (-) Transpiler ]
NewExpression
SpreadElement
UpdateExpression
AwaitExpression
UnaryExpression
BinaryExpression
LogicalExpression
ConditionalExpression
YieldExpression
AssignmentExpression
SequenceExpression
BlockStatement                        [ (x) Unittest (x) Parser (-) Transpiler ]
BreakStatement
ClassDeclaration                      [ (x) Unittest (-) Parser (-) Transpiler ]
ContinueStatement
DebuggerStatement
DoWhileStatement
EmptyStatement
ExpressionStatement
ForStatement
ForInStatement
ForOfStatement
FunctionDeclaration
IfStatement
LabeledStatement
ReturnStatement
SwitchStatement
SwitchCase
ThrowStatement
TryStatement
CatchClause
VariableDeclaration                   [ (x) Unittest (x) Parser (-) Transpiler ]
VariableDeclarator
WhileStatement
WithStatement
Program
ImportDeclaration
ImportSpecifier
ImportDefaultSpecifier
ImportNamespaceSpecifier
ExportAllDeclaration
ExportDefaultDeclaration
ExportNamedDeclaration
ExportSpecifier

--

## Expressions and Patterns

A binding pattern can be one of the following:

```ts
type BindingPattern = ArrayPattern | ObjectPattern;
```

An expression can be one of the following:

```ts
type Expression = ThisExpression | Identifier | Literal |
    ArrayExpression | ObjectExpression | FunctionExpression | ArrowFunctionExpression | ClassExpression |
    TaggedTemplateExpression | MemberExpression | Super | MetaProperty |
    NewExpression | CallExpression | UpdateExpression | AwaitExpression | UnaryExpression |
    BinaryExpression | LogicalExpression | ConditionalExpression |
    YieldExpression | AssignmentExpression | SequenceExpression;
```

Array Pattern

```ts
interface ArrayPattern {
    type: 'ArrayPattern';
    elements: ArrayPatternElement[];
}
```

with

```ts
type ArrayPatternElement = AssignmentPattern | Identifier | BindingPattern | RestElement | null;

interface RestElement {
    type: 'RestElement';
    argument: Identifier | BindingPattern;
}
```

Assignment Pattern

interface AssignmentPattern {
    type: 'AssignmentPattern';
    left: Identifier | BindingPattern;
    right: Expression;
}

Object Pattern

interface ObjectPattern {
    type: 'ObjectPattern';
    properties: Property[];
}

This Expression

interface ThisExpression {
    type: 'ThisExpression';
}

Identifier

interface Identifier {
    type: 'Identifier';
    name: string;
}

Literal

interface Literal {
    type: 'Literal';
    value: boolean | number | string | RegExp | null;
    raw: string;
    regex?: { pattern: string, flags: string };
}

The regex property only applies to regular expression literals.
Array Expression

interface ArrayExpression {
    type: 'ArrayExpression';
    elements: ArrayExpressionElement[];
}

where

type ArrayExpressionElement = Expression | SpreadElement;

Object Expression

interface ObjectExpression {
    type: 'ObjectExpression';
    properties: Property[];
}

where

interface Property {
    type: 'Property';
    key: Identifier | Literal;
    computed: boolean;
    value: AssignmentPattern | Identifier | BindingPattern | FunctionExpression | null;
    kind: 'get' | 'set' | 'init';
    method: false;
    shorthand: boolean;
}

Function Expression

interface FunctionExpression {
    type: 'FunctionExpression';
    id: Identifier | null;
    params: FunctionParameter[];
    body: BlockStatement;
    generator: boolean;
    async: boolean;
    expression: boolean;
}

with

type FunctionParameter = AssignmentPattern | Identifier | BindingPattern;

The value of generator is true for a generator expression.
Arrow Function Expression

interface FunctionExpression {
    type: 'ArrowFunctionExpression';
    id: Identifier | null;
    params: FunctionParameter[];
    body: BlockStatement | Expression;
    generator: boolean;
    async: boolean;
    expression: false;
}

Class Expression

interface ClassExpression {
    type: 'ClassExpression';
    id: Identifier | null;
    superClass: Identifier | null;
    body: ClassBody;

with

interface ClassBody {
    type: 'ClassBody';
    body: MethodDefinition[];
}

interface MethodDefinition {
    type: 'MethodDefinition';
    key: Expression | null;
    computed: boolean;
    value: FunctionExpression | null;
    kind: 'method' | 'constructor';
    static: boolean;
}

Tagged Template Expression

interface TaggedTemplateExpression {
    type: 'TaggedTemplateExpression';
    readonly tag: Expression;
    readonly quasi: TemplateLiteral;
}

with

interface TemplateElement {
    type: 'TemplateElement';
    value: { cooked: string; raw: string };
    tail: boolean;
}

interface TemplateLiteral {
    type: 'TemplateLiteral';
    quasis: TemplateElement[];
    expressions: Expression[];
}

Member Expression

```ts
interface MemberExpression {
    type: 'MemberExpression';
    computed: boolean;
    object: Expression;
    property: Expression;
}
```

Super

interface Super {
    type: 'Super';
}

MetaProperty

interface MetaProperty {
    type: 'MetaProperty';
    meta: Identifier;
    property: Identifier;
}

Call and New Expressions

interface CallExpression {
    type: 'CallExpression';
    callee: Expression;
    arguments: ArgumentListElement[];
}

interface NewExpression {
    type: 'NewExpression';
    callee: Expression;
    arguments: ArgumentListElement[];
}

with

type ArgumentListElement = Expression | SpreadElement;

interface SpreadElement {
    type: 'SpreadElement';
    argument: Expression;
}

Update Expression

interface UpdateExpression {
    type: 'UpdateExpression';
    operator: '++' | '--';
    argument: Expression;
    prefix: boolean;
}

Await Expression

interface AwaitExpression {
    type: 'AwaitExpression';
    argument: Expression;
}

Unary Expression

interface UnaryExpression {
    type: 'UnaryExpression';
    operator: '+' | '-' | '~' | '!' | 'delete' | 'void' | 'typeof';
    argument: Expression;
    prefix: true;
}

Binary Expression

interface BinaryExpression {
    type: 'BinaryExpression';
    operator: 'instanceof' | 'in' | '+' | '-' | '*' | '/' | '%' | '**' |
        '|' | '^' | '&' | '==' | '!=' | '===' | '!==' |
        '<' | '>' | '<=' | '<<' | '>>' | '>>>';
    left: Expression;
    right: Expression;
}

Logical Expression

interface LogicalExpression {
    type: 'LogicalExpression';
    operator: '||' | '&&';
    left: Expression;
    right: Expression;
}

Conditional Expression

interface ConditionalExpression {
    type: 'ConditionalExpression';
    test: Expression;
    consequent: Statement;
    alternate?: Statement;
}

Yield Expression

interface YieldExpression {
    type: 'YieldExpression';
    argument: Expression | null;
    delegate: boolean;
}

Assignment Expression

interface AssignmentExpression {
    type: 'AssignmentExpression';
    operator: '=' | '*=' | '**=' | '/=' | '%=' | '+=' | '-=' |
        '<<=' | '>>=' | '>>>=' | '&=' | '^=' | '|=';
    left: Expression;
    right: Expression;
}

Sequence Expression

interface SequenceExpression {
    type: 'SequenceExpression';
    expressions: Expression[];
}

Statements and Declarations

A statement can be one of the following:

```ts
type Statement = BlockStatement | BreakStatement | ContinueStatement |
    DebuggerStatement | DoWhileStatement | EmptyStatement |
    ExpressionStatement | ForStatement | ForInStatement |
    ForOfStatement | FunctionDeclaration | IfStatement |
    LabeledStatement | ReturnStatement | SwitchStatement |
    ThrowStatement | TryStatement | VariableDeclaration |
    WhileStatement | WithStatement;
```

A declaration can be one of the following:

```ts
type Declaration = ClassDeclaration | FunctionDeclaration |  VariableDeclaration;
```

A statement list item is either a statement or a declaration:

type StatementListItem = Declaration | Statement;

## Block Statement

A series of statements enclosed by a pair of curly braces form a block statement:

```ts
interface BlockStatement {
    type: 'BlockStatement';
    body: StatementListItem[];
}
```

Break Statement

interface BreakStatement {
    type: 'BreakStatement';
    label: Identifier | null;
}

Class Declaration

interface ClassDeclaration {
    type: 'ClassDeclaration';
    id: Identifier | null;
    superClass: Identifier | null;
    body: ClassBody;
}

Continue Statement

interface ContinueStatement {
    type: 'ContinueStatement';
    label: Identifier | null;
}

Debugger Statement

interface DebuggerStatement {
    type: 'DebuggerStatement';
}

Do-While Statement

interface DoWhileStatement {
    type: 'DoWhileStatement';
    body: Statement;
    test: Expression;
}

Empty Statement

interface EmptyStatement {
    type: 'EmptyStatement';
}

Expression Statement

interface ExpressionStatement {
    type: 'ExpressionStatement';
    expression: Expression;
    directive?: string;
}

When the expression statement represents a directive (such as "use strict"), then the directive property will contain the directive string.
For Statement

interface ForStatement {
    type: 'ForStatement';
    init: Expression | VariableDeclaration | null;
    test: Expression | null;
    update: Expression | null;
    body: Statement;
}

For-In Statement

interface ForInStatement {
    type: 'ForInStatement';
    left: Expression;
    right: Expression;
    body: Statement;
    each: false;
}

For-Of Statement

interface ForOfStatement {
    type: 'ForOfStatement';
    left: Expression;
    right: Expression;
    body: Statement;
}

Function Declaration

interface FunctionDeclaration {
    type: 'FunctionDeclaration';
    id: Identifier | null;
    params: FunctionParameter[];
    body: BlockStatement;
    generator: boolean;
    async: boolean;
    expression: false;
}

with

type FunctionParameter = AssignmentPattern | Identifier | BindingPattern;

If Statement

interface IfStatement {
    type: 'IfStatement';
    test: Expression;
    consequent: Statement;
    alternate?: Statement;
}

Labelled Statement

A statement prefixed by a label becomes a labelled statement:

interface LabeledStatement {
    type: 'LabeledStatement';
    label: Identifier;
    body: Statement;
}

Return Statement

interface ReturnStatement {
    type: 'ReturnStatement';
    argument: Expression | null;
}

Switch Statement

interface SwitchStatement {
    type: 'SwitchStatement';
    discriminant: Expression;
    cases: SwitchCase[];
}

with

interface SwitchCase {
    type: 'SwitchCase';
    test: Expression;
    consequent: Statement[];
}

Throw Statement

interface ThrowStatement {
    type: 'ThrowStatement';
    argument: Expression;
}

Try Statement

interface TryStatement {
    type: 'TryStatement';
    block: BlockStatement;
    handler: CatchClause | null;
    finalizer: BlockStatement | null;
}

with

interface CatchClause {
    type: 'CatchClause';
    param: Identifier | BindingPattern;
    body: BlockStatement;
}

Variable Declaration

interface VariableDeclaration {
    type: 'VariableDeclaration';
    declarations: VariableDeclarator[];
    kind: 'var' | 'const' | 'let';
}

with

interface VariableDeclarator {
    type: 'VariableDeclarator';
    id: Identifier | BindingPattern;
    init: Expression | null;
}

While Statement

interface WhileStatement {
    type: 'WhileStatement';
    test: Expression;
    body: Statement;
}

With Statement

interface WithStatement {
    type: 'WithStatement';
    object: Expression;
    body: Statement;
}

Scripts and Modules

A program can be either a script or a module.

interface Program {
  type: 'Program';
  sourceType: 'script';
  body: StatementListItem[];
}

interface Program {
  type: 'Program';
  sourceType: 'module';
  body: ModuleItem[];
}

with

type StatementListItem = Declaration | Statement;
type ModuleItem = ImportDeclaration | ExportDeclaration | StatementListItem;

Import Declaration

type ImportDeclaration {
    type: 'ImportDeclaration';
    specifiers: ImportSpecifier[];
    source: Literal;
}

with

interface ImportSpecifier {
    type: 'ImportSpecifier' | 'ImportDefaultSpecifier' | 'ImportNamespaceSpecifier';
    local: Identifier;
    imported?: Identifier;
}

Export Declaration

An export declaration can be in the form of a batch, a default, or a named declaration.

type ExportDeclaration = ExportAllDeclaration | ExportDefaultDeclaration | ExportNamedDeclaration;

Each possible export declaration is described as follows:

interface ExportAllDeclaration {
    type: 'ExportAllDeclaration';
    source: Literal;
}

interface ExportDefaultDeclaration {
    type: 'ExportDefaultDeclaration';
    declaration: Identifier | BindingPattern | ClassDeclaration | Expression | FunctionDeclaration;
}

interface ExportNamedDeclaration {
    type: 'ExportNamedDeclaration';
    declaration: ClassDeclaration | FunctionDeclaration | VariableDeclaration;
    specifiers: ExportSpecifier[];
    source: Literal;
}

with

interface ExportSpecifier {
    type: 'ExportSpecifier';
    exported: Identifier;
    local: Identifier;
};
