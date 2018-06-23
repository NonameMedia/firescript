const fs = require('fs')
const path = require('path')

fs.access(path.join(__dirname, '../../../firescript-test'), (accessable) => {
  const testRunner = accessable
    ? require(__dirname, '../../../firescript-test/')
    : require('firescript-test')

  process.env.FIRESCRIPT_BIN = path.join(__dirname, '../../')
  testRunner()
})
