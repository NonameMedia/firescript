const path = require('path')

process.env.FIRESCRIPT_MODULE = path.join(__dirname, '../../')

function loadModule (moduleLink) {
  try {
    return require(moduleLink)
  } catch (err) {
    return null
  }
}

const moduleLinks = [
  path.join(__dirname, '../../../firescript-test/'),
  'firescript-test'
]

let hasTests = false
for (const moduleLink of moduleLinks) {
  const testModule = loadModule(moduleLink)
  if (testModule) {
    testModule()
    hasTests = true
    break
  }
}

if (!hasTests) {
  throw new Error('Firescript syntax tests not found! Run `npm install firescript-test` and try it again!')
}
