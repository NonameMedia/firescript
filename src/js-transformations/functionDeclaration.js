const transform = require('./transformers/defaultParameter')

module.exports = (transformer) => {
  if (transformer.test((ctx) => ctx.esDefaultParams === false)) {
    transformer.add('FunctionDeclaration', transform)
  }
}
