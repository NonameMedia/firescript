const path = require('path')
const inspect = require('inspect.js')
const RenderContext = require('../../src/RenderContext')
const SourceBuffer = require('../../src/SourceBuffer')
const TEST_CASE_DIR = path.join(__dirname, '../fixtures/elements')
const SOURCE_DIR = path.join(__dirname, '../fixtures/sources')

describe('JSElements', () => {
  describe('transpile', () => {
    const testCases = inspect.readDir(TEST_CASE_DIR)
    let group

    testCases.forEach((testCase) => {
      if (testCase.isDirectory()) {
        group = testCase.name

        if (group.charAt(0) === '_') {
          it.skip(`${group.substr(1)} into JS from an AST snippet`)
          return
        }

        it(`${group} into JS from an AST snippet`, () => {
          const ast = require(`${testCase.path}/ast.json`)
          const source = inspect
            .readFile(`${testCase.path}/index.js`)
            .replace(/EOF\s*$/, '')

          const ctx = new RenderContext()
          const Element = require(`../../src/js-elements/${ast.type}`)
          const jse = new Element(ast)
          inspect(jse.toESString(ctx)).isEql(source)
        })
      }
    })
  })

  describe.only('generate location maps', () => {
    const testCases = inspect.readDir(SOURCE_DIR)
    let group

    testCases.forEach((testCase) => {
      if (testCase.isDirectory()) {
        group = testCase.name

        if (group.charAt(0) === '_') {
          it.skip(`${group.substr(1)} into JS from an AST snippet`)
          return
        }

        it(`${group} into JS from an AST snippet`, () => {
          const ast = require(`${testCase.path}/ast-loc.json`)
          const source = inspect
            .readFile(`${testCase.path}/index.js`)
            .replace(/EOF\s*$/, '')

          const buffer = new SourceBuffer()
          const Element = require(`../../src/js-elements/${ast.type}`)
          const jse = new Element(ast)
          jse.compile(buffer)
          inspect(buffer.toString()).isEql(source)
          inspect(buffer.locationMap).isEql([
            [1, 1, 1, 1, 'import'],
            [1, 15, 1, 15, 'Fruits'],
            [1, 20, 1, 20],
            [, , , ],
            [, , , ],
            [, , , ],
            [, , , ],
            [, , , ],
            [, , , ]
          ])
        })
      }
    })
  })
})
