FS Noderelations
================

LabeledStatement:
SequenceExpression:
LogicalExpression:
UnaryExpression:
ArrayPattern:
ObjectPattern:
AssignmentPattern:
RestElement:
TryStatement:
CatchClause:
ThrowStatement:
SpreadElement:
TaggedTemplateExpression:
TemplateElement:
TemplateLiteral:
MetaProperty:
SwitchStatement:
SwitchCase:
DoWhileStatement:
ImportNamespaceSpecifier:
ImportDeclaration:
ImportSpecifier:
ImportDefaultSpecifier:
ForStatement:
ForInStatement:
ForOfStatement:
UpdateExpression:
ExportNamedDeclaration:
ExportAllDeclaration:
ExportSpecifier:
ExportDefaultDeclaration:
ConditionalExpression:
ClassDeclaration:
ClassExpression:
ClassBody:
MethodDefinition:
IfStatement:
WhileStatement:
NewExpression:
MemberExpression:
AssignmentExpression:
BinaryExpression:
ExpressionStatement:
AwaitExpression:
YieldExpression:
ArrowFunctionExpression:
FunctionDeclaration:
BreakStatement:
ContinueStatement:
DebuggerStatement:
ThisExpression:
ReturnStatement:
FunctionExpression:
ObjectExpression:
Property:
ArrayExpression:
BlockStatement:
CallExpression:
VariableDeclaration:
VariableDeclarator:
Program:
Literal:
Identifier:



type BindingPattern = ArrayPattern | ObjectPattern;

type Expression = ThisExpression | Identifier | Literal |
    ArrayExpression | ObjectExpression | FunctionExpression | ArrowFunctionExpression | ClassExpression |
    TaggedTemplateExpression | MemberExpression | Super | MetaProperty |
    NewExpression | CallExpression | UpdateExpression | AwaitExpression | UnaryExpression |
    BinaryExpression | LogicalExpression | ConditionalExpression |
    YieldExpression | AssignmentExpression | SequenceExpression;

type ArrayPatternElement = AssignmentPattern | Identifier | BindingPattern | RestElement | null;

type ArrayExpressionElement = Expression | SpreadElement;

type FunctionParameter = AssignmentPattern | Identifier | BindingPattern;

type ArgumentListElement = Expression | SpreadElement;

type Statement = BlockStatement | BreakStatement | ContinueStatement |
    DebuggerStatement | DoWhileStatement | EmptyStatement |
    ExpressionStatement | ForStatement | ForInStatement |
    ForOfStatement | FunctionDeclaration | IfStatement |
    LabeledStatement | ReturnStatement | SwitchStatement |
    ThrowStatement | TryStatement | VariableDeclaration |
    WhileStatement | WithStatement;

type Declaration = ClassDeclaration | FunctionDeclaration |  VariableDeclaration;

type StatementListItem = Declaration | Statement;

type FunctionParameter = AssignmentPattern | Identifier | BindingPattern;

type ModuleItem = ImportDeclaration | ExportDeclaration | StatementListItem;

type ImportDeclaration {
    type: 'ImportDeclaration';
    specifiers: ImportSpecifier[];
    source: Literal;
}

type ExportDeclaration = ExportAllDeclaration | ExportDefaultDeclaration | ExportNamedDeclaration;

interface ExportSpecifier {
    type: 'ExportSpecifier';
    exported: Identifier;
    local: Identifier;
};

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

interface ImportSpecifier {
    type: 'ImportSpecifier' | 'ImportDefaultSpecifier' | 'ImportNamespaceSpecifier';
    local: Identifier;
    imported?: Identifier;
}

interface Program {
  type: 'Program';
  sourceType: 'module';
  body: ModuleItem[];
}

interface Program {
  type: 'Program';
  sourceType: 'script';
  body: StatementListItem[];
}

interface WhileStatement {
    type: 'WhileStatement';
    test: Expression;
    body: Statement;
}

interface VariableDeclarator {
    type: 'VariableDeclarator';
    id: Identifier | BindingPattern;
    init: Expression | null;
}

interface VariableDeclaration {
    type: 'VariableDeclaration';
    declarations: VariableDeclarator[];
    kind: 'var' | 'const' | 'let';
}

interface CatchClause {
    type: 'CatchClause';
    param: Identifier | BindingPattern;
    body: BlockStatement;
}

interface TryStatement {
    type: 'TryStatement';
    block: BlockStatement;
    handler: CatchClause | null;
    finalizer: BlockStatement | null;
}

interface ThrowStatement {
    type: 'ThrowStatement';
    argument: Expression;
}

interface SwitchCase {
    type: 'SwitchCase';
    test: Expression;
    consequent: Statement[];
}

interface SwitchStatement {
    type: 'SwitchStatement';
    discriminant: Expression;
    cases: SwitchCase[];
}

interface ReturnStatement {
    type: 'ReturnStatement';
    argument: Expression | null;
}

interface LabeledStatement {
    type: 'LabeledStatement';
    label: Identifier;
    body: Statement;
}

interface IfStatement {
    type: 'IfStatement';
    test: Expression;
    consequent: Statement;
    alternate?: Statement;
}

interface FunctionDeclaration {
    type: 'FunctionDeclaration';
    id: Identifier | null;
    params: FunctionParameter[];
    body: BlockStatement;
    generator: boolean;
    async: boolean;
    expression: false;
}

interface ForOfStatement {
    type: 'ForOfStatement';
    left: Expression;
    right: Expression;
    body: Statement;
}

interface ForInStatement {
    type: 'ForInStatement';
    left: Expression;
    right: Expression;
    body: Statement;
    each: false;
}

interface ForStatement {
    type: 'ForStatement';
    init: Expression | VariableDeclaration | null;
    test: Expression | null;
    update: Expression | null;
    body: Statement;
}

interface ExpressionStatement {
    type: 'ExpressionStatement';
    expression: Expression;
    directive?: string;
}

interface EmptyStatement {
    type: 'EmptyStatement';
}

interface DoWhileStatement {
    type: 'DoWhileStatement';
    body: Statement;
    test: Expression;
}

interface DebuggerStatement {
    type: 'DebuggerStatement';
}

interface ContinueStatement {
    type: 'ContinueStatement';
    label: Identifier | null;
}

interface ClassDeclaration {
    type: 'ClassDeclaration';
    id: Identifier | null;
    superClass: Identifier | null;
    body: ClassBody;
}

interface BreakStatement {
    type: 'BreakStatement';
    label: Identifier | null;
}

interface BlockStatement {
    type: 'BlockStatement';
    body: StatementListItem[];
}

interface SequenceExpression {
    type: 'SequenceExpression';
    expressions: Expression[];
}

interface AssignmentExpression {
    type: 'AssignmentExpression';
    operator: '=' | '*=' | '**=' | '/=' | '%=' | '+=' | '-=' |
        '<<=' | '>>=' | '>>>=' | '&=' | '^=' | '|=';
    left: Expression;
    right: Expression;
}

interface YieldExpression {
    type: 'YieldExpression';
    argument: Expression | null;
    delegate: boolean;
}

interface ConditionalExpression {
    type: 'ConditionalExpression';
    test: Expression;
    consequent: Statement;
    alternate?: Statement;
}

interface LogicalExpression {
    type: 'LogicalExpression';
    operator: '||' | '&&';
    left: Expression;
    right: Expression;
}

interface BinaryExpression {
    type: 'BinaryExpression';
    operator: 'instanceof' | 'in' | '+' | '-' | '*' | '/' | '%' | '**' |
        '|' | '^' | '&' | '==' | '!=' | '===' | '!==' |
        '<' | '>' | '<=' | '<<' | '>>' | '>>>';
    left: Expression;
    right: Expression;
}

interface UnaryExpression {
    type: 'UnaryExpression';
    operator: '+' | '-' | '~' | '!' | 'delete' | 'void' | 'typeof';
    argument: Expression;
    prefix: true;
}

interface AwaitExpression {
    type: 'AwaitExpression';
    argument: Expression;
}

interface UpdateExpression {
    type: 'UpdateExpression';
    operator: '++' | '--';
    argument: Expression;
    prefix: boolean;
}

interface SpreadElement {
    type: 'SpreadElement';
    argument: Expression;
}

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

interface MetaProperty {
  type: 'MetaProperty';
  meta: Identifier;
  property: Identifier;
}

interface Super {
    type: 'Super';
}

interface MemberExpression {
    type: 'MemberExpression';
    computed: boolean;
    object: Expression;
    property: Expression;
}

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

interface TaggedTemplateExpression {
    type: 'TaggedTemplateExpression';
    readonly tag: Expression;
    readonly quasi: TemplateLiteral;
}

interface MethodDefinition {
    type: 'MethodDefinition';
    key: Expression | null;
    computed: boolean;
    value: FunctionExpression | null;
    kind: 'method' | 'constructor';
    static: boolean;
}

interface ClassBody {
    type: 'ClassBody';
    body: MethodDefinition[];
}

interface ClassExpression {
    type: 'ClassExpression';
    id: Identifier | null;
    superClass: Identifier | null;
    body: ClassBody;
}

interface FunctionExpression {
    type: 'ArrowFunctionExpression';
    id: Identifier | null;
    params: FunctionParameter[];
    body: BlockStatement | Expression;
    generator: boolean;
    async: boolean;
    expression: false;
}

interface FunctionExpression {
    type: 'FunctionExpression';
    id: Identifier | null;
    params: FunctionParameter[];
    body: BlockStatement;
    generator: boolean;
    async: boolean;
    expression: boolean;
}

interface Property {
    type: 'Property';
    key: Identifier | Literal;
    computed: boolean;
    value: AssignmentPattern | Identifier | BindingPattern | FunctionExpression | null;
    kind: 'get' | 'set' | 'init';
    method: false;
    shorthand: boolean;
}

interface ObjectExpression {
    type: 'ObjectExpression';
    properties: Property[];
}

interface ArrayPattern {
    type: 'ArrayPattern';
    elements: ArrayPatternElement[];
}

interface RestElement {
    type: 'RestElement';
    argument: Identifier | BindingPattern;
}

interface AssignmentPattern {
    type: 'AssignmentPattern';
    left: Identifier | BindingPattern;
    right: Expression;
}

interface ObjectPattern {
    type: 'ObjectPattern';
    properties: Property[];
}

interface ThisExpression {
    type: 'ThisExpression';
}

interface Identifier {
    type: 'Identifier';
    name: string;
}

interface Literal {
    type: 'Literal';
    value: boolean | number | string | RegExp | null;
    raw: string;
    regex?: { pattern: string, flags: string };
}

interface ArrayExpression {
    type: 'ArrayExpression';
    elements: ArrayExpressionElement[];
}
