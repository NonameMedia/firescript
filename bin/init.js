const path = require('path')
const fs = require('fs')
const SuperFS = require('superfs')
const superconf = require('superconf')
const colorfy = require('colorfy')
const defaultConf = require(path.join(__dirname, '../conf/defaultConf.json'))
// const initTemplate = require('firescript-project-templates').initTemplate
const runtimeVersion = require('firescript-runtime/package.json').version
const CLIUtils = require('../src/CLIUtils').CLIUtils

function loadPkg () {
  try {
    return require(path.join(process.cwd(), './package.json'))
  } catch (err) {
    if (err.code === 'MODULE_NOT_FOUND') { return {} }
    throw err.stack
  }
}

module.exports = (fireio) => {
  return fireio
    .cmd('init [template]')
    .description('Create and initialize a .firerc.json configuration file under current working dir')
    .action(async (ctx, template) => {
      const configFile = path.join(process.cwd(), '.firerc.json')
      const conf = superconf.merge(defaultConf, superconf('fire') || {})

      const pkg = loadPkg()
      const gitRepo = ''
      const requiredPackages = ['firescript-runtime']
      const requiredDevPackages = ['firescript']

      if (!pkg.name) {
        const pkgQuestions = await ctx
          .ask({ name: 'name', question: 'What is your project name', default: path.basename(process.cwd()) })
          .ask({ name: 'version', question: 'Initial project version', default: '0.0.0' })
          .ask({ name: 'description', question: 'Project description' })
          .ask({ name: 'main', question: 'Entry point', default: 'app.js' })
          .ask({ name: 'lintModule', question: 'Lint module', default: 'firelint' })
          .ask({ name: 'testModule', question: 'Test module', default: 'firescript-test' })
          .ask({ name: 'repo', question: 'Git repository', default: gitRepo })
          .ask({ name: 'keywords', question: 'Keywords' })
          .ask({ name: 'license', question: 'License', default: 'MIT' })
          .prompt()

        Object.assign(pkg, {
          name: pkgQuestions.name,
          version: pkgQuestions.version,
          description: pkgQuestions.description,
          main: pkgQuestions.main,
          scripts: {},
          dependencies: {},
          devDependencies: {},
          repo: pkgQuestions.repo,
          keywords: pkgQuestions.keywords,
          license: pkgQuestions.license
        })

        if (pkgQuestions.lintModule) {
          pkg.scripts.lint = `${pkgQuestions.lintModule}`
          requiredDevPackages.push(pkgQuestions.lintModule)
        }

        if (pkgQuestions.testModule) {
          const testCommand = pkgQuestions.testModule === 'firescript-test' ? 'firetest' : pkgQuestions.testModule
          pkg.scripts.test = `${testCommand}`
          requiredDevPackages.push(pkgQuestions.testModule)
        }

        pkg.scripts.build = 'firescript build'
      }

      const res = await ctx
        .ask({ name: 'src', question: 'Enter source folder', default: conf.src })
        .ask({ name: 'dest', question: 'Enter destination folder', default: conf.dest })
        // .ask({ name: 'copy', question: 'Copy files to dest folder', default: conf.copy, type: 'array' })
        .ask({ name: 'esModules', question: 'ES7 modules enabled (y[es] n[o]?', default: conf.features.esModules ? 'yes' : 'no', type: 'boolean' })
        .ask({ name: 'esClasses', question: 'ES6 classes enabled (y[es] n[o]?', default: conf.features.esClasses ? 'yes' : 'no', type: 'boolean' })
        .prompt()

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

      cf.yellow('Create file: ').grey('.firerc.json').print()
      console.log(prettyResult, '\n')

      await SuperFS.writeFile(configFile, prettyResult)

      if (!pkg.dependencies) {
        pkg.dependencies = {}
      }

      if (!pkg.dependencies['firescript-runtime']) {
        pkg.dependencies['firescript-runtime'] = `~${runtimeVersion}`
      }

      // if (template) {
      //   const files = await initTemplate(template, pkg)
      //   console.log('Files', files)
      // }

      cf.yellow('Create file: ').grey('package.json').print()
      console.log(pkg, '\n')

      const finalQuestions = await ctx
        .ask({ name: 'continue', question: 'Is your setup correct?', type: 'boolean' })
        .prompt()

      if (!finalQuestions.continue) {
        console.log('Cancel')
        return false
      }

      fs.writeFileSync(path.join(process.cwd(), './package.json'), JSON.stringify(pkg, null, '  '))

      if (requiredPackages.length) {
        const command = ['npm', 'install', '--save', ...requiredPackages]
        const cmd = await CLIUtils.runCommand(command, {
          stdio: 'inherit',
          env: process.env,
          cwd: process.cwd()
        })
        console.log('Install dependencies', cmd.exitCode)
      }

      if (requiredDevPackages.length) {
        const command = ['npm', 'install', '--save-dev', ...requiredDevPackages]
        const cmd = await CLIUtils.runCommand(command, {
          stdio: 'inherit',
          env: process.env,
          cwd: process.cwd()
        })
        console.log('Install dev dependencies', cmd.exitCode)
      }
    })
}
