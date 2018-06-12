FireScript
==========

FireScript is a language which gets transpiled into Javascript. A language which uses indention for block scoping, lesser code to write and an extra set of methods and utils. FireScript output is valid ES6 Javascript.

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
