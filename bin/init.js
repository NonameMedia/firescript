const path = require('path')
const SuperFS = require('superfs')
const superconf = require('superconf')
const colorfy = require('colorfy')
const defaultConf = require(path.join(__dirname, '../conf/defaultConf.json'))
// const initTemplate = require('firescript-project-templates').initTemplate

function loadPkg () {
  try {
    return SuperFS.file(path.join(process.cwd(), './package.json'))
  } catch (err) {
    if (err.code === 100) { return {} }
    throw err
  }
}

module.exports = (fireio) => {
  return fireio
    .cmd('init [template]')
    .description('Create and initialize a .firerc.json configuration file under current working dir')
    .action(async (ctx, template) => {
      const configFile = path.join(process.cwd(), '.firerc.json')
      const conf = superconf.merge(defaultConf, superconf('fire') || {})

      const res = await ctx
        .ask({ name: 'src', question: 'Enter source folder', default: conf.src })
        .ask({ name: 'dest', question: 'Enter destination folder', default: conf.dest })
        // .ask({ name: 'copy', question: 'Copy files to dest folder', default: conf.copy, type: 'array' })
        .ask({ name: 'esModules', question: 'ES7 modules enabled (y[es] n[o]?', default: conf.features.esModules ? 'yes' : 'no', type: 'boolean' })
        .ask({ name: 'esClasses', question: 'ES6 classes enabled (y[es] n[o]?', default: conf.features.esClasses ? 'yes' : 'no', type: 'boolean' })
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

      const pkgFile = loadPkg()
      const pkg = await pkgFile.readJSON()
      pkg.firescript = true

      if (template) {
        const files = await initTemplate(template, pkg)
        console.log('Files', files)
      }

      console.log('PKG', pkg)
      await pkgFile.writeJSON(pkg)
    })
}
