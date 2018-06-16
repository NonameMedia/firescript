const banana = require('banana').banana;
const coconut = require('banana').coconut;
const p1 = require('banana').peach;
module.exports = { banana: banana };
module.exports.Coconut = class Coconut {
  constructor () {
    return this.banana;
  }
};
let peach = 'Peach';
module.exports.peach = peach;
module.exports.__esModule = true;
