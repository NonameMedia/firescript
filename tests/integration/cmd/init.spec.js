const inspect = require('inspect.js')
const sinon = require('sinon')
inspect.useSinon(sinon)

const shellInspect = require('shell-inspect')
const projectDir = path.join(__dirname, '../../tmp/')
const cmd = path.join(__dirname, '../../../bin/fire')

describe('Init command', () => {
  beforeEach(() => {
    inspect.removeDir(projectDir, { silent: true })
    inspect.createDir(projectDir, { silent: true })
  })

  describe('project setup', () => {
    it('creates a firerc.json file', () => {
      return shellInspect
        .cwd(projectDir)
        .cmd(`${cmd} init`)
        .test(() => {

        })
    })
  })
})
