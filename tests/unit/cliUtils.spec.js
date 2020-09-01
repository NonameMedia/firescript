const path = require('path')
const inspect = require('inspect.js')
const sinon = require('sinon')
inspect.useSinon(sinon)

const FirescriptParser = require('firescript-parser').FirescriptParser
const cliUtils = require('../../src/utils/cliUtils')

describe('cliUtils', () => {
  describe('module', () => {
    it('has a function export named colorizeParseError', () => {
      inspect(cliUtils.colorizeParseError).isFunction()
    })
  })

  describe('colorizeParseError', () => {
    it.skip('colorize a parse error message', () => {
      const parser = new FirescriptParser({
        filename: '/examples/error.fire'
      })

      const source = inspect.readFile(path.join(__dirname, '../../examples/error.fire'))
      inspect.print(source)

      let parseErr
      try {
        parser.parse(source)
      } catch (err) {
        parseErr = err
      }

      inspect.print(parseErr)

      parseErr = cliUtils.colorizeParseError(parseErr)
      console.log(parseErr)
      inspect(parseErr).isEql(
        'Unexpected token in file /examples/erro.fire in line 5 at column 26\n' +
        '3 | class Banana\n' +
        '4 | \n' +
        '5 | \n' +
        'x | \n'
      )
    })
  })
})
