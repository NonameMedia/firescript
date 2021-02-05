Firescript
==========

[![Build Status](https://travis-ci.com/NonameMedia/firescript.svg?branch=develop)](https://travis-ci.com/NonameMedia/firescript)

<img src="./docs/logo.png" align="right" style="padding: 10px; width: 30%">

Firescript is a script language that compiles into Javascript.
A language which uses indention for block scoping, it has a clear and strict syntax, it supports dynamic typing and it's lesser code to write. The compiled output is clean and readable Javascript.

Firescript is written in Node.js and partially in Firescript. It already has a syntax highlighter and linter integration for Atom IDE.

Firescript is under developing, we recommend to not use it for production yet!

Syntax
------

```coffee
import Fruits from './fruits'

export class Banana extends Fruits
    constructor ()
        super()

        this.name = 'Banana'
        this.color = 'yellow'

    getName ()
        return this.name

    setName (str name)
        return this.name = name
```

```coffee
import Banana from './banana'

const banana = new Banana()
print(banana.getName())
```

Docs
----

The docs page is not ready yet. If you're interested in the planed syntax, please have a look at the `docs/lang/` folder.


Requirements
------------

Firescript requires Node.js 12 or higher.

Install
-------

There are two options to install firescript. The most common option is to install it globaly using **npm**.  

`npm install -g firescript`

We recommend to install firescript localy. This installs an executable in `./node_modules/.bin` which makes Firescript accessable for NPM. Use `npx firescript [subcommand]`.


`npm install firescript`

Firescript is accessable on commandline by using the `firescript` command.

Usage
-----

### Command Line

Firescript comes with a commandline. If you've installed Firescript globally, you should have access to it by the `firescript` command. Run `firescript help` to get an overview of all available sub-commands or run `firescript help <command>` to get a command's help page.

#### Commands

| Command | Description |
|----------|--|
| `build` | Compiles all `.fire` files and copies assets, reads project configuration from `.firerc.json` |
| `copy` | Copies all assets, configured in `.firerc.json` by `copy` option to `dest` folder |
| `init` | Initialize new Firescript project at current working dir |
| `help` | Print a command overview |
| `parse` | Parse a `.fire` or `.js` file into an AST tree |
| `tokenize` | Tokenize a `.fire` or a `.js` file |
| `compile` | Compiles a `.fire` file into Javascript or a `.js` file into Firescript |
| `watch` | Watch `src` dir for changes and compiles changed `.fire` files |




Getting started
--------------


Create a Firescript project by using the `init` command. Create a project folder, change into it and run `firescript init` to initialize a Firescript project.

```shell
mkdir ~/Projects/myfsproject
cd myfsproject
npm init
npm install firescript
firescript init
```

You'll find a `.firerc.json` file within your project folder. This file contains build and feature configuration.

Firescript uses `.fire` as file extension. The `build` command transpiles all `.fire` files found in the source folder and writes the output to the destination folder. All other files are being ignored during the build process.

Use the [Firescript Example](
https://github.com/Andifeind/firescript-example) project to play a little with it.

Code compilation
------------------

Run `firescript build` to build the project. The `firescript watch` command re-transpiles files when their content changes. Both commands overwriting existing files without prompting.



Author
------

Andi Heinkelein <andi@noname-media.com>

License
-------

Firescript is licensed under the MIT license.  
See [LICENSE](./LICENSE)
