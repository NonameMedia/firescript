const path = require('path')
const SuperFS = require('superfs')
const superconf = require('superconf')
const colorfy = require('colorfy')

module.exports = (supershit) => {
  return supershit
    .cmd('copy')
    .description('Copies files as configured by copy flag')
    .action(async (ctx, name) => {
      const conf = superconf('fire', {
        defaultConf: path.join(__dirname, '../conf/defaultConf.json')
      })

      if (!conf.copy) {
        return
      }

      const srcDir = path.resolve(process.cwd(), conf.src)
      const destDir = path.resolve(process.cwd(), conf.dest)
      const files = await SuperFS.readDir(srcDir, {
        filter: conf.copy,
        recursive: true
      })

      const copyFiles = files.filter((fl) => {
        return !fl.path.startsWith(destDir)
      })

      const cf = colorfy()
      cf.txt('Copy ').lime(String(copyFiles.length)).txt([' file from ', ' files from ', files.length]).grey(conf.src).txt(' to ').lime(conf.dest).nl()
      for (const fl of copyFiles) {
        const srcFile = path.join(conf.src, fl.relative)
        const destFile = path.join(conf.dest, fl.relative)
        cf.txt('copy ').grey(srcFile).txt(' -> ').lime(destFile).nl()
        await fl.copy(destFile)
      }

      cf.print()
    })
}
