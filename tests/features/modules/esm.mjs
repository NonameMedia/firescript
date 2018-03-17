import * as mod1 from '../../fixtures/modules/banana.mjs'
import * as mod2 from '../../fixtures/modules/banana.js'

console.log('Module: banana')
console.log(mod1)
console.log(mod2)

import { Banana as mod3 } from '../../fixtures/modules/banana.mjs'
// import { Banana as mod4 } from '../../fixtures/modules/banana.js'

console.log('Module: banana')
console.log(mod3)
