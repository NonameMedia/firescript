Firescript
==========

Firescript is a language which gets transpiled into Javascript.
A language which uses indention for block scoping, has a clear and strict syntax, it supports dynamic typing and it's lesser code to write. The transpiled output is clean and readable Javascript.

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

or for local usage

`npm install firescript`

Firescript is accessable on commandline by using the `fire` command.

Usage
-----

### Command Line

Firescript comes with a commandline. If you've installed Firescript globally, you should have access to it by the `fire` command. Run `fire help` to get an overview of all available sub-commands or run `fire help <command>` to get a command's help page.

#### Commands

| Command | Description |
|----------|--|
| `build` | Transpiles all `.fire` files and copies assets, reads project configuration from `.firerc.json` |
| `copy` | Copies all assets, configured in `.firerc.json` by `copy` option to `dest` folder |
| `init` | Initialize new Firescript project at current working dir |
| `help` | Print a command overview |
| `parse` | Parse a `.fire` or `.js` file into an AST tree |
| `tokenize` | Tokenize a `.fire` or a `.js` file |
| `transpile` | Transpiles a `.fire` file into Javascript or a `.js` file into Firescript |
| `watch` | Watch `src` dir for changes und transpiles changed `.fire` files |




Getting started
--------------


Create a Firescript project by using the `init` command. Create a project folder, change into it and run `fire init` to initialize a Firescript project.

```shell
mkdir ~/Projects/myfsproject
cd myfsproject
fire init
```

You'll find a `.firerc.json` file within your project folder. This file contains build and feature configuration.

Firescript uses `.fire` as file extension. The `build` command transpiles all `.fire` files found in the source folder and writes the output to the destination folder. All other file are being ignored during the build process.

Use the [Firescript Example]() project to play a little with it.

Code transpilation
------------------

Run `fire build` to build the project. The `fire watch` command re-transpiles files when their content changes. Both commands overwriting existing files without prompting.

Author
------

Andi Heinkelein <andifeind@noname-media.com>  

License
-------

Firescript is licensed under the MIT license.  
See [LICENSE.md](./LICENSE.md)
