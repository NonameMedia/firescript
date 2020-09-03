const inspect = require('inspect.js')
const sinon = require('sinon')
const path = require('path')
inspect.useSinon(sinon)

const shellInspect = require('shell-inspect')
const projectDir = path.join(__dirname, '../../../')
const cmd = path.join(__dirname, '../../../bin/fire')
const helloAstStr = inspect.readFile(path.join(__dirname, '../fixtures/helloAst.json'))

describe('CLI', () => {
  beforeEach(() => {
  })

  describe('fire parse [file]', () => {
    it('parse a firescript file', () => {
      return shellInspect
        .cwd(projectDir)
        .cmd(`${cmd} parse examples/hello.fire`)
        .test((ctx) => {
          inspect(ctx.exitCode).isEqual(0)
          inspect(ctx.text).isEql(helloAstStr)
        })
    })
  })
})
