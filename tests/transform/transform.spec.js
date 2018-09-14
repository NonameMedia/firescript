const path = require('path')
const inspect = require('inspect.js')

const {
  FirescriptParser,
  FirescriptTranspiler,
  FirescriptTokenizer,
  JSTranspiler
} = require('../../')

describe('Firescript Transform', () => {
  /**
   * Test transpilation from fire to AST to JS
   *
   * tokenize `source.fire` -> tokenstack
   * parse `source.fire` -> FS-AST
   * transpiles FS-AST -> JS
   *
   * optional, set transpiler options from `fsconf.json`
   */
  const TEST_CASE_DIR = path.join(__dirname, './')
  const testCases = inspect.readDir(TEST_CASE_DIR)

  testCases.forEach((testCase) => {
    if (testCase.isDirectory()) {
      const group = testCase.name
      describe(group, () => {
        if (group.charAt(0) === '_') {
          it.skip(`${group.substr(1)} into Javascript`)
          return
        }

        const fssource = inspect.readFile(`${testCase.path}/index.fire`)
        const fstoken = require(`${testCase.path}/fstoken.json`)
        const fsast = require(`${testCase.path}/fsast.json`)
        const fsconf = inspect.readJSON(`${testCase.path}/fsconf.json`)
        const jsresult = inspect.readFile(`${testCase.path}/result.js`)

        it(`tokenize .fire script`, () => {
          const tokenizer = new FirescriptTokenizer()
          const res = tokenizer.tokenize(fssource)

          inspect(res).isArray()
          inspect(res).isEql(fstoken)
        })

        it(`parse .fire script into FS-AST`, () => {
          const parser = new FirescriptParser()
          const res = parser.parse(fssource)

          inspect(res).isObject()
          inspect(res).hasProps(fsast)
        })

        it(`transpile FS-AST into JS`, () => {
          const transpiler = new JSTranspiler({
            features: fsconf
          })
          const res = transpiler.transpile(fsast)

          inspect(res).isString()
          inspect(res).isEql(jsresult)
        })
      })
    }
  })
})
