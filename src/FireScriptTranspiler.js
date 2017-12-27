const Program = require('./fireScriptElements').Program

class FireScriptTranspiler {
  constructor () {
    
  }

  transpile (ast) {
    const fireScript = new Program(ast)
    return fireScript.toString()
  }
}

module.exports = FireScriptTranspiler
