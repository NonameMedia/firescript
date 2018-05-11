const path = require('path')
const SuperFS = require('superfs')
const superconf = require('superconf')
const colorfy = require('colorfy')
const defaultConf = require(path.join(__dirname, '../conf/defaultConf.json'))

module.exports = (supershit) => {
  return supershit
    .cmd('init')
    .description('Create and initialize a .firerc configuration file under current working dir')
    .action(async function (ctx, name) {
      const configFile = path.join(process.cwd(), '.firerc')
      const conf = superconf.merge(defaultConf, superconf('fire') || {})

      const res = await this
        .ask({ name: 'src', question: 'Source folder', default: conf.src })
        .ask({ name: 'dest', question: 'Destination folder', default: conf.dest })
        .ask({ name: 'copy', question: 'Copy file patterns', default: conf.copy, type: 'array' })
        .ask({ name: 'esModules', question: 'ES7 modules enabled (y[es] n[o]?', default: conf.features.esModules ? 'yes' : 'no', type: 'bool', allow: ['y', 'yes', 'n', 'no'] })
        .ask({ name: 'esClasses', question: 'ES6 classes enabled (y[es] n[o]?', default: conf.features.esClasses ? 'yes' : 'yes', type: 'bool', allow: ['y', 'yes', 'n', 'no'] })
        .prompt()

      console.log(res)

      const prettyResult = JSON.stringify({
        src: res.src,
        dest: res.dest,
        copy: res.copy,
        features: {
          esModules: res.esModules,
          esClasses: res.esClasses
        }
      }, null, '  ')

      const cf = colorfy()

      cf.nl().txt('Write configuration to ').lgrey(configFile).nl()
      cf.grey(prettyResult).print()

      await SuperFS.writeFile(configFile, prettyResult)
    })
}
