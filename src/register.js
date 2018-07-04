const firescript = require('../')

function compile (mod, filename) {
  mod._compile(firescript.transpileFile(filename), filename)
}

require.extensions['.fire'] = compile
