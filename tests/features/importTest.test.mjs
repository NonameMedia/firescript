import inspect from 'inspect.js'

console.log('TEST: es7 banana')
import * as banana from '../fixtures/modules/es7/banana'

console.log('RES:', banana)
inspect(banana).isClass()
inspect(banana).hasKey('getInstance')
inspect(banana.getInstance).isFunction()

console.log('TEST: es7 coconut')
import {coconut as coconut2} from '../fixtures/modules/es7/coconut'

inspect(coconut2).hasKey('Coconut')
inspect(coconut2.Coconut).isClass()
inspect(coconut2).hasKey('getInstance')
inspect(coconut2.getInstance).isFunction()
