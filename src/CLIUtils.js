const FireFS = require('firescript-firefs').FireFS
const spawn = require('child_process').spawn
const accessSync = require('fs').accessSync

module.exports.CLIUtils = class CLIUtils {
  static async pathExists (filePath) {
    return FireFS.pathExists(filePath)
  }

  static pathExistsSync (filePath) {
    try {
      accessSync(filePath)
      return true
    } catch (err) {
      if (err.code === 'ENOENT') {
        return false
      }
      throw err
    }
  }

  static runCommand (cmd, opts) {
    opts = opts || {}
    const command = cmd[0]
    const args = cmd.slice(1)
    const body = []
    const errors = []
    return new Promise((resolve, reject) => {
      const cld = spawn(command, args, {
        env: opts.env || process.env,
        cwd: opts.cwd || process.cwd(),
        stdio: opts.stdio || 'pipe'
      })

      console.log('CLD', cld)
      if (cld.stdout) {
        cld.stdout.on('data', (data) => {
          body.push(data)
        })
      }

      if (cld.stdout) {
        cld.stderr.on('data', (data) => {
          errors.push(data)
        })
      }

      cld.on('exit', (exitCode) => {
        if (exitCode === 0) {
          resolve({
            exitCode: 0,
            body: body.join('\n'),
            pid: cld.pid
          })
          return null
        }
        const msg = errors.join('\n').trim()
        reject(new Error(`Subcommand ${cld.pid} failed with exitCode ${exitCode}: ${msg}`))
      })
    })
  }
}
