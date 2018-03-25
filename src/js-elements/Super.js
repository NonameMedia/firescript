const JSElement = require('./JSElement')

/**
 * Super
 *
 * @class Super
 * @extends JSElement
 *
 * interface Super {
    type: 'Super';
}
*/
class Super extends JSElement {
  constructor (ast) {
    super(ast)
  }

  toESString (ctx) {
    return 'super'
  }
}

module.exports = Super
