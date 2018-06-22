FireScript
==========

FireScript is a language which gets transpiled into Javascript. A language which uses indention for block scoping, dynamic typing, lesser code to write. FireScript output is valid Javascript.

Syntax
------

```ts
import Fruits from './fruits'

class Banana extends Fruits
  constructor ()
    super()

    this.name = 'Banana'
    this.color = 'yellow'

  getName ()
    return this.name

  setName (str name)
    return this.name = name

export Banana
```

```ts
import Banana from './banana'

const banana = new Banana()
print(banana.getName())
```

Requirements
------------

Firescript requires Node 8 or higher.

Getting started
--------------


The best way is to install Firescript globally. Run `npm install -g firescript`.
Firescript is accessable by `fire` command after installation.
Create your first Firescript project by using the `init` command. Change into  your project root and run `fire init` to initialize a project.

```shell
mkdir ~/Projects/myfsproject
cd myfsproject
fire init
```

You'll find a `.firerc.json` file within your project folder. This file contains build and feature configuration.

Firescript uses `.fire` as file extension. The `build` command transpiles all `.fire` files found in the source folder and transpiles it into the destination folder. All other file are being ignored during the build process.

Use the [Firescript Example]() project to play a little with it.
