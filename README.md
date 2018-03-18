FireScript
==========

FireScript is a language which gets transpiled into Javascript. A language which uses indention for block scoping, lesser code to write and an extra set of methods and utils. FireScript output is valid ES6 Javascript.

```fs
import Fruits from './fruits'

interface Banana
  str name
  str color

class Banana extends Fruits
  def constructor () this
    super()

    this.name = 'Banana'
    this.color = 'yellow'

  def getName () str
    return this.name

export default Banana
```

```fs
import Banana from './banana'

const Banana banana = new Banana()
print(banana.getName())
```
