const superconf = require('superconf')
const defaultConf = require('../../conf/defaultConf.json')

class ParserConfig {
  constructor () {
    const conf = superconf('firescript', {
      cwd: process.cwd()
    })

    this.__conf = superconf.config({
      dept: 1
    }).merge(defaultConf, conf)
  }

  getConf () {
    return this.__conf
  }

  merge (conf) {
    return superconf.config({
      dept: 1
    }).merge(this.__conf, conf)
  }
}

module.exports = ParserConfig
