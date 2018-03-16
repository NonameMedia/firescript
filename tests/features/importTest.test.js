const inspect = require('inspect.js')
const mocha = require('mocha')

describe.only('Import test', () => {
  describe('es6', () => {
    it('import banana module', () => {
      const banana = require('../fixtures/modules/es6/banana')
      inspect(banana).isClass()
      inspect(banana).hasKey('getInstance')
      inspect(banana.getInstance).isFunction()
    })

    it('import coconut module', () => {
      const coconut = require('../fixtures/modules/es6/coconut')
      inspect(coconut).hasKey('Coconut')
      inspect(coconut.Coconut).isClass()
      inspect(coconut).hasKey('getInstance')
      inspect(coconut.getInstance).isFunction()
    })
  })

  if (true) {
    describe('es7', () => {
      it('import banana module', () => {
        const banana = require('../fixtures/modules/es7/banana')
        inspect(banana).isClass()
        inspect(banana).hasKey('getInstance')
        inspect(banana.getInstance).isFunction()
      })

      it('import coconut module', () => {
        const coconut = require('../fixtures/modules/es7/coconut')
        inspect(coconut).hasKey('Coconut')
        inspect(coconut.Coconut).isClass()
        inspect(coconut).hasKey('getInstance')
        inspect(coconut.getInstance).isFunction()
      })
    })
  }
})
