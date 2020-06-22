Item
====

Description

Syntax
------

```
class Banana
  private [type] [name]
```

#### Firescript

```fire
class Banana
  private str name
```

#### Javascript

```js
__fs_private_1 = {}


function FSClassFactory__Banana() {
  var __fs_private = {}

  return class Banana {
    constructor () {
      __fs_private_1.data = FS.typing('str', name)
    }

    getName() {
      return __fs_private_1.data
    }
  }
}
```

```fire
class Banana
  private str color

  constructor()
    this.color = 'green'

  getColor()
    return this.color


const banana = new Banana()
banana.color = 'red' # Throw error
foo(banana.color) # Throw error
```

```js

class Banana {
  constructor() {
    this.color = 'green'
  }

  getColor() {
    return this.color
  }
}

const banana = new Banana()
banana.color = 'red' # Throw error
foo(banana.color) # Throw error
```

1) Parse class, add to var stash
varstash = {
  Banana: ClassDeclaration
  --
  banana: NewDeclaration
}

2) Parse const, check varstash has no item `banana`
3) Check value, new instance of `Banana` is part of varstash
4) Check `banana` is part of varstash
5) Check `color` is a property of 'Banana', check property is readable
  * `banana` is a NewDeclaration and has prop `color` and is public
  * `banana` is a ObjectExpression and has prop `color`
  * Throw Error
