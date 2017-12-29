const path = require('path')
const inspect = require('inspect.js')
const SuperFS = require('superfs')
const FireScriptParser = require('../../').FireScriptParser
const JSParser = require('../../').JSParser
let testFiles = null

function getFiles(dirName) {
  return SuperFS.readDir(path.join('../fixtures/', dirName), {
    recursive: true
  })
}

const steps = ['step-01']

describe('Integrtion test runner', () => {
  steps.forEach((step) => {
    describe(step, () => {
      let allFiles
      before(() => {
        return getFiles(step).then((files) => {
          allFiles = files
        })
      })

      let group
      allFiles.forEach((fl) => {
        if (fl.isDir) {
          group = fl.name
        }

        if (fl.ext === 'js') {
          it (`Transpile ${group} from JS into AST`, () => {
            const parser = new JParser()
            return fl.read().then((source) => {
              const ast = parser.parse(source)
              console.log(ast)
            })
          })
        }
      })
    })
  })
})
