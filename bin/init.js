const path = require('path')
const SuperFS = require('superfs')
const superconf = require('superconf')
const colorfy = require('colorfy')

module.exports = (supershit) => {
  return supershit
    .cmd('init')
    .description('Create and initialize a .firerc configuration file under current working dir')
    .action(async function (ctx, name) {
      const configFile = path.join(process.cwd(), '.firerc')
      const conf = superconf('fire', {
        defaultConf: path.join(__dirname, '../conf/defaultConf')
      })

      const res = await this
        .ask({ name: 'src', default: conf.src })
        .ask({ name: 'dest', default: conf.dest })
        .ask({ name: 'esModules', description: 'ES7 modules enabled (y[es] n[o]?', default: conf.features.esModules ? 'yes' : 'no', type: 'bool', allow: ['y', 'yes', 'n', 'no'] })
        .ask({ name: 'esClasses', description: 'ES6 classes enabled (y[es] n[o]?', default: conf.features.esClasses ? 'yes' : 'yes', type: 'bool', allow: ['y', 'yes', 'n', 'no'] })
        .prompt()

      const prettyResult = JSON.stringify({
        src: res.src,
        dest: res.dest,
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
