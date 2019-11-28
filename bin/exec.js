const path = require('path')

module.exports = (fireio) => {
  return fireio
    .cmd('exec <file>')
    .description('Executes a .fire file')
    .action(async (ctx, file) => {
      if (path.extname(file) !== '.fire') {
        throw new Error('Input file seems not to be a .fire file')
      }

      file = path.resolve(process.cwd(), file)
      require('../src/register')
      require(file)
    })
}
