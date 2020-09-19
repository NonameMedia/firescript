const BuiltinModule = require('module').BuiltinModule
const firescript = require('../')

function compile (mod, filename) {
  mod._compile(firescript.transpileFile(filename, {
    setLocation: true,
    filename: filename
  }), filename)
}

const Module = module.constructor.length > 1 ? module.constructor : BuiltinModule
if (!Module._extensions['.fire']) {
  Module._extensions['.fire'] = compile
}
