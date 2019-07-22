const path = require('path')
const inspect = require('inspect.js')
const SourceBuffer = require('../../src/SourceBuffer')
const ParserContext = require('../../src/ParserContext')
const Parser = require('../../src/Parser')
const RenderContext = require('../../src/RenderContext')

const parserConf = require('../../src/fs-parser/parserConf')
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
        const fsNodeType = metaFile && metaFile.fsNode ? metaFile.fsNode : ast.type
        const jsNodeType = metaFile && metaFile.jsNode ? metaFile.jsNode : ast.type
        const skipJS = !!(metaFile && metaFile.skipJS)
        const skipFS = !!(metaFile && metaFile.skipFS)
        const jssource = inspect
          .readFile(`${testCase.path}/index.js`)
          .replace(/EOF\s*$/, '')

        const fssource = inspect
          .readFile(`${testCase.path}/index.fire`)
          .replace(/EOF\s*$/, '')

        it('(1) parse Firescript into AST', () => {
          const ctx = new ParserContext({
            setLocation: true,
            setRange: true
          })

          const parser = new Parser(parserConf)
          parser.parse(fssource)

          const Node = require(`../../src/fs-parser/nodes/${fsNodeType}`)
          const node = new Node(parser)
          const fsast = node.resolve(ctx)
          // console.log('NODE', fsast)
          inspect(fsast).hasProps(ast)
        })

        if (!skipJS) {
          it('(2) transpile AST into Javascript', () => {
            // console.log('AST', ast)
            const buffer = new SourceBuffer()
            const Element = require(`../../src/js-elements/${jsNodeType}`)
            const jse = new Element(ast)
            jse.compile(buffer)
            inspect(buffer.toString()).isEql(jssource)
          })
        }

        if (!skipFS) {
          it('(3) transpile AST into Firescript', () => {
            const Element = require(`../../src/fs-elements/${fsNodeType}`)
            // console.log('AST', ast)
            const fse = new Element(ast)
            const ctx = new RenderContext({}, 'fire')
            const res = fse.toFSString(ctx)
            inspect(res).isEql(fssource)
          })
        }

        if (!metaFile || !metaFile.locationMap) {
          it.skip('skipped, missing metafile')
          return
        }

        if (!skipJS) {
          it('(4) generate location-map', () => {
            const ctx = new ParserContext({
              setLocation: true
            })

            const parser = new Parser(parserConf)
            parser.parse(fssource)

            const Node = require(`../../src/fs-parser/nodes/${fsNodeType}`)
            const node = new Node(parser)
            const fsast = node.resolve(ctx)

            const buffer = new SourceBuffer()
            const Element = require(`../../src/js-elements/${fsast.type}`)
            const jse = new Element(fsast)
            jse.compile(buffer)
            const res = buffer.toString()
            inspect(res).isEql(jssource)

            inspect(buffer).hasKey('locationMap')
            inspect(buffer.locationMap).isEql(metaFile.locationMap)
          })
        }
      })
    }
  })
})
