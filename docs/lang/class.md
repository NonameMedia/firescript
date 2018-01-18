Item
====

Description

Syntax
------

### class declaration

```fire
class Foo
  constructor ()
    this.value = 'foo'

  bla ()
    return this.value
```

#### Output

```js

```

Allowed childs
--------------

```

```

Esprima interfaces

------------------

```ts
interface ClassDeclaration {
    type: 'ClassDeclaration';
    id: Identifier | null;
    superClass: Identifier | null;
    body: ClassBody;
}

interface ClassExpression {
    type: 'ClassExpression';
    id: Identifier | null;
    superClass: Identifier | null;
    body: ClassBody;
}

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
```

Examples
--------

```fire

```
