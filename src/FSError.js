const isBrowser = typeof window === 'object'

const red = isBrowser ? '' : '\u001b[38;5;160m'
const yellow = isBrowser ? '' : '\u001b[38;5;226m'
const dgrey = isBrowser ? '' : '\u001b[38;5;244m'
const lgrey = isBrowser ? '' : '\u001b[38;5;250m'
const azure = isBrowser ? '' : '\u001b[38;5;39m'
const uncolor = isBrowser ? '' : '\u001b[m'

class FSError extends Error {
  constructor (message, parser) {
    super(message)
  }

  toString () {
    const stack = this.stack.split('\n')
    const reg = /at\s+(.+)\s+\((.+?):(\d+):(\d+)\)/
    const msg = stack.shift()
    const colorizedStack = stack.map((line) => {
      const match = line.match(reg)

      if (!match) {
        return line
      }

      const cap = {
        method: match[1],
        file: match[2],
        line: match[3],
        column: match[4]
      }

      let str = ` at ${azure}${cap.method}${uncolor} `
      let source = ''
      let lineNum = parseInt(cap.line)
      let columnNum = parseInt(cap.column)

      if (cap.file.indexOf('/node_modules/') !== -1) {
        str += `${dgrey}${cap.file}${uncolor}`
      } else {
        str += `${lgrey}${cap.file}${uncolor}`
      }

      str += ` ${lineNum}:${columnNum}`
      return source + str
    }).join('\n')

    const nl = '\n'
    this.stackOrig = this.stack
    this.stack = `${msg}${nl}${colorizedStack}`
    return `${red}Firescript Error${uncolor} ${msg}`
  }
}

module.exports.FSError = FSError
