const path = require('path')
const inspect = require('inspect.js')
const RenderContext = require('../../src/RenderContext')
const TEST_CASE_DIR = path.join(__dirname, '../fixtures/elements')

describe('FireScriptElements', () => {
  describe('transpile', () => {
    const testCases = inspect.readDir(TEST_CASE_DIR)
    let group

    testCases.forEach((testCase) => {
      if (testCase.isDirectory()) {
        group = testCase.name

        if (group.charAt(0) === '_') {
          it.skip(`${group.substr(1)} into FireScript from an AST snippet`)
          return
        }

        it(`${group} into FireScript from an AST snippet`, () => {
          const ast = require(`${testCase.path}/ast.json`)
          const source = (
            inspect.readFile(`${testCase.path}/result.fire`, { silent: true }) ||
            inspect.readFile(`${testCase.path}/index.fire`)
          ).replace(/EOF\s*$/, '')

          const ctx = new RenderContext(null, 'fire')
          const Element = require(`../../src/fs-elements/${ast.type}`)
          const fse = new Element(ast)
          inspect(fse.toFSString(ctx)).isEql(source)
        })
      }
    })
  })
})
