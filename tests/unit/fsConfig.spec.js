const path = require('path')
const inspect = require('inspect.js')
const FSConfig = require('../../src/utils/FSConfig')

describe('FSConfig', () => {
  describe('instance', () => {
    it('returns a config load from CWD', () => {
      process.chdir(path.join(__dirname, '../fixtures/banana-project'))
      const conf = new FSConfig()
      inspect(conf.getConf()).isEql({
        src: './',
        dest: 'dist/',
        copy: [],
        features: {
          esModules: false,
          esDefaultParams: false,
          esClasses: true,
          esTemplates: true,
          extendRegExp: true
        }
      })
    })
  })

  describe('getConf()', () => {
    it('returns all config as json', () => {
      process.chdir(path.join(__dirname, '../fixtures/banana-project'))
      const conf = new FSConfig()
      inspect(conf.getConf()).isEql({
        src: './',
        dest: 'dist/',
        copy: [],
        features: {
          esModules: false,
          esDefaultParams: false,
          esClasses: true,
          esTemplates: true,
          extendRegExp: true
        }
      })
    })
  })

  it('returns a specific config item as json', () => {
    process.chdir(path.join(__dirname, '../fixtures/banana-project'))
    const conf = new FSConfig()
    inspect(conf.getConf('features')).isEql({
      esModules: false,
      esDefaultParams: false,
      esClasses: true,
      esTemplates: true,
      extendRegExp: true
    })
  })
})
