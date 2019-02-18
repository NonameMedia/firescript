const Comment = require('./Comment')

/**
 * Block
 *
 * @class Block
 * @extends JSElement
 *
 * interface Block {
 *   type: 'Block';
 *   value: string;
 * }
 */
class Block extends Comment {
  compile (buffer) {
    buffer.write('/*')
    buffer.write(this.value)
    buffer.write('*/')
  }
}

module.exports = Block
