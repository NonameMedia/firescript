const inspect = require('inspect.js')
const sinon = require('sinon')
const path = require('path')
inspect.useSinon(sinon)

const shellInspect = require('shell-inspect')
const projectDir = path.join(__dirname, '../../../')
const cmd = path.join(__dirname, '../../../bin/fire')

describe('CLI', () => {
  beforeEach(() => {
  })

  describe('fire exec [file]', () => {
    it('executes a firescript file', () => {
      return shellInspect
        .cwd(projectDir)
        .cmd(`${cmd} exec examples/hello.fire`)
        .test((ctx) => {
          inspect(ctx.exitCode).isEqual(0)
          inspect(ctx.text).doesContain('Hello World')
        })
    })
  })
})
