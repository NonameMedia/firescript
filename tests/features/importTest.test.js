const inspect = require('inspect.js')

console.log('TEST: es6')
const banana = require('../fixtures/modules/es6/banana')
inspect(banana).isClass()
inspect(banana).hasKey('getInstance')
inspect(banana.getInstance).isFunction()

console.log('TEST: es6 coconut')
const coconut = require('../fixtures/modules/es6/coconut')
inspect(coconut).hasKey('Coconut')
inspect(coconut.Coconut).isClass()
inspect(coconut).hasKey('getInstance')
inspect(coconut.getInstance).isFunction()

console.log('TEST: es7 banana')
import banana as banana2 from '../fixtures/modules/es7/banana'

inspect(banana2).isClass()
inspect(banana2).hasKey('getInstance')
inspect(banana2.getInstance).isFunction()

console.log('TEST: es7 coconut')
import coconut as coconut2 from '../fixtures/modules/es7/coconut'

inspect(coconut2).hasKey('Coconut')
inspect(coconut2.Coconut).isClass()
inspect(coconut2).hasKey('getInstance')
inspect(coconut2.getInstance).isFunction()
