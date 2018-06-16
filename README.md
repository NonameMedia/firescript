FireScript
==========

FireScript is a language which gets transpiled into Javascript. A language which uses indention for block scoping, lesser code to write and an extra set of methods and utils. FireScript output is valid ES6 Javascript.

Syntax
------

```fs
import Fruits from './fruits'

class Banana extends Fruits
  constructor ()
    super()

    this.name = 'Banana'
    this.color = 'yellow'

  getName ()
    return this.name

export Banana
```

```fs
import Banana from './banana'

const banana = new Banana()
print(banana.getName())
```

Getting started
--------------

The best way is to install Firescript globally. Run `npm install -g firescript`.
Create your first Firescript project by using the `init` command. First, create a home for your project and run `fire init` to initialize a project.

```shell
mkdir ~/Projects/myfsproject
cd myfsproject
fire init
```

You'll find a `.firerc.json` file within your project folder. The file contains a build configuration.
