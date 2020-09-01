const inspect = require('inspect.js')
const sinon = require('sinon')
inspect.useSinon(sinon)

describe.skip('register module', () => {
  it('has a register module', () => {
    inspect('../../register').isModule()
  })

  it('registers firescript modules', () => {

  })
})
