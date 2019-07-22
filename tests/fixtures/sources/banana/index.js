import { Fruits } from './Fruits';

class Banana extends Fruits {
  constructor (opts) {
    this.isSweet = opts.isSweet;
  }

  peel () {
    this.__isPeeled = true;
  }
}

export { Banana };
