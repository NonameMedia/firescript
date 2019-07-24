const Comment = require('./Comment')

/**
 * Line
 *
 * @class Line
 * @extends JSElement
 *
 * interface Line {
 *   type: 'Line';
 *   value: string;
 * }
 */
class Line extends Comment {
  compile (buffer) {
    buffer.write('//')
    buffer.write(this.value)
  }
}

module.exports = Line
