const path = require('path')
const SuperFS = require('superfs')
const superconf = require('superconf')
const colorfy = require('colorfy')

module.exports = (fireio) => {
  return fireio
    .cmd('exec <file>')
    .description('Executes a file')
    .action(async (ctx, file) => {
      console.log('Default command', file)
    })
}
