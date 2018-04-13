const path = require('path')
const inspect = require('inspect.js')
const ParserConfig = require('../../src/utils/ParserConfig')

describe('ParserConfig', () => {
  describe('instance', () => {
    it('returns a config load from CWD', () => {
      process.chdir(path.join(__dirname, '../fixtures/banana-project'))
      const conf = new ParserConfig()
      inspect(conf.getConf()).isEql({
        src: 'src/',
        dest: 'dist/',
        features: {
          esModules: false
        }
      })
    })
  })
})
