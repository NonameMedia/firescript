const inspect = require('inspect.js')
const sinon = require('sinon')
inspect.useSinon(sinon)

const FirescriptParser = require('../../../src/FirescriptParser')

describe.skip('VariableDeclaration (const)', () => {
  describe('next()', () => {
    let parser

    before(() => {
      parser = new FirescriptParser()

      parser.parse('const banana = \'Banana\'')
    })

    it('returns a identifier item', () => {
      const parser = new FirescriptParser()
      const fsAst = parser.parse('const banana = \'Banana\'')
      inspect(fsAst).isEql({})
    })
  })
})
