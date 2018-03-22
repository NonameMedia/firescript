import Fruits from './Fruits'

const foo = { a: 'A', b: 'B' }
const foo2 = {
  // ind ++
  a: 'A',
  b: 'B'
}

class Banana extends Fruits {
  // ind ++
  constructor (opts) {
    // ind ++
    this.isSweet = opts.isSweet
  }

  peel () {
    // ind ++
    this.__isPeeled = true
  }
}

export default Banana
