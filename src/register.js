const firescript = require('../')

function compile (mod, filename) {
  mod._compile(firescript.transpileFile(filename, {
    setLocation: true
  }), filename)
}

require.extensions['.fire'] = compile
