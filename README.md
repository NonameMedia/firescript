Firescript
==========

Firescript is a language which gets transpiled into Javascript. A language which uses indention for block scoping, dynamic typing, lesser code to write. Firescript output is valid Javascript.

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

Firescript requires Node.js 8 or higher.

Install
-------

Install firescript globaly using **npm**.  
`npm install -g firescript`

Firescript is accessable on commandline by using the `fire` command.

Getting started
--------------


Create your first Firescript project by using the `init` command. Change into  your project root and run `fire init` to initialize a project.

```shell
mkdir ~/Projects/myfsproject
cd myfsproject
fire init
```

You'll find a `.firerc.json` file within your project folder. This file contains build and feature configuration.

Firescript uses `.fire` as file extension. The `build` command transpiles all `.fire` files found in the source folder and writes the output into the destination folder. All other file are being ignored during the build process.

Use the [Firescript Example]() project to play a little with it.

Code transpilation
------------------

Run `fire build` to build the project. The `fire watch` command re-transpiles files it they content has changed. Both commands overwriting existing files without prompting.

Authors
-------

Andi Heinkelein <andifeind@noname-media.com>  

License
-------

Firescript was licensed under the MIT license.  
See [LICENSE.md](./LICENSE.md)
