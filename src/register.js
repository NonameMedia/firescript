const firescript = require('../')

function compile (mod, filename) {
  mod._compile(firescript.transpileFile(filename, {
    setLocation: true,
    filename: filename
  }), filename)
}

// eslint-disable-next-line node/no-deprecated-api
require.extensions['.fire'] = compile
