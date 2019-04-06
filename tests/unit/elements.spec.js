const path = require('path')
const inspect = require('inspect.js')
const SourceBuffer = require('../../src/SourceBuffer')
const ParserContext = require('../../src/ParserContext')
const Tokenizer = require('../../src/FirescriptTokenizer')
const RenderContext = require('../../src/RenderContext')
const TEST_CASE_DIR = path.join(__dirname, 'elements')

describe('Elements', () => {
  const testCases = inspect.readDir(TEST_CASE_DIR)
  let group
  testCases.forEach((testCase) => {
    if (testCase.isDirectory()) {
      group = testCase.name

      describe(group, () => {
        if (group.charAt(0) === '_') {
          it.skip(`${group.substr(1)} elements tests`)
          return
        }

        const metaFile = inspect.readJSON(`${testCase.path}/metafile.json`, {
          silent: true
        })

        const ast = require(`${testCase.path}/ast.json`)
        const jssource = inspect
          .readFile(`${testCase.path}/index.js`)
          .replace(/EOF\s*$/, '')

        const fssource = inspect
          .readFile(`${testCase.path}/index.fire`)
          .replace(/EOF\s*$/, '')

        it('(1) parse Firescript into AST', () => {
          const tokenizer = new Tokenizer({
            loc: true
          })

          const token = tokenizer.tokenize(fssource)

          const ctx = new ParserContext({
            setLocation: true
          })

          const Node = require(`../../src/fs-nodes/${ast.type}`)
          const node = new Node(token)
          const fsast = node.toJSON(ctx)
          inspect(fsast).hasProps(ast)
        })

        it('(2) transpile AST into Javascript', () => {
          const buffer = new SourceBuffer()
          const Element = require(`../../src/js-elements/${ast.type}`)
          const jse = new Element(ast)
          jse.compile(buffer)
          inspect(buffer.toString()).isEql(jssource)
        })

        // it.skip('TODO: (3) parse Javascript into AST')

        it('(3) transpile AST into Firescript', () => {
          const Element = require(`../../src/fs-elements/${ast.type}`)
          const fse = new Element(ast)
          const ctx = new RenderContext({}, 'fire')
          const res = fse.toFSString(ctx)
          inspect(res).isEql(fssource)
        })

        if (!metaFile) {
          it.skip('skipped, missing metafile')
          return
        }

        it('(4) get length of source', () => {
          const Element = require(`../../src/js-elements/${ast.type}`)
          const jse = new Element(ast)
          const len = jse.getLineLength()
          inspect(`${len}`).isEql(`${metaFile.sourceLength}`)
        })

        it('(5) generate location-map', () => {
          const tokenizer = new Tokenizer({
            loc: true
          })

          const token = tokenizer.tokenize(fssource)

          const ctx = new ParserContext({
            setLocation: true
          })

          const Node = require(`../../src/fs-nodes/${ast.type}`)
          const node = new Node(token)
          const fsast = node.toJSON(ctx)

          const buffer = new SourceBuffer()
          const Element = require(`../../src/js-elements/${fsast.type}`)
          const jse = new Element(fsast)
          jse.compile(buffer)
          const res = buffer.toString()
          inspect(res).isEql(jssource)

          inspect(buffer).hasKey('locationMap')
          inspect(buffer.locationMap).isEql(metaFile.locationMap)
        })
      })
    }
  })

  describe.skip('generate location maps', () => {
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
          const ast = require(`${testCase.path}/ast-loc.json`)
          const source = inspect
            .readFile(`${testCase.path}/index.js`)
            .replace(/EOF\s*$/, '')

          const buffer = new SourceBuffer()
          const Element = require(`../../src/js-elements/${ast.type}`)
          const jse = new Element(ast)
          jse.compile(buffer)
          inspect(buffer.toString()).isEql(source)
          inspect(buffer.locationMap).isEql(metaFile.locationMap)
        })
      }
    })
  })
})
