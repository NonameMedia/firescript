const inspect = require('inspect.js')

inspect.test('Default import', () => {
  const banana = require('./modules/banana')
  console.log('Banana:', banana)
})

inspect.test('Class import', () => {
  const { Peach } = require('./modules/peach')
  console.log('Peach:', Peach)
})

inspect.run(() => {

})
