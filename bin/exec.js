const path = require('path')

module.exports = (fireio) => {
  const cmd = fireio
    .cmd('exec <file>')
    .description('Executes a .fire file')
    .action((ctx, file) => {
      require('../src/register')
      try {
        require(path.resolve(process.cwd(), file))
      } catch (err) {
        console.log(err)
        process.exit(1)
      }
    })

  fireio.__commands.setDefaultCommand('exec')
  return cmd
}
