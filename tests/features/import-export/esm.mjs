import inspect from 'inspect.js'
import banana from './modules/banana'
import coconut from './modules/coconut'
import { Peach } from './modules/peach'
import { Cherry } from './modules/cherry'

inspect.test('Default import (CJS)', () => {
  console.log('Banana:', banana)
})

inspect.test('Default import (ESM)', () => {
  console.log('Coconut:', coconut)
})

inspect.test('Classs import (CJS)', () => {
  console.log('Peach:', Peach)
})

inspect.test('Class import (ESM)', () => {
  console.log('Cherry:', Cherry)
})

inspect.run(() => {

})
