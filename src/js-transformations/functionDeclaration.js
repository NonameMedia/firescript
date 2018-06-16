const transform = require('./transformers/defaultParameter')

module.exports = (transformer) => {
  if (transformer.test((ctx) => ctx.esDefaultParameter === false)) {
    transformer.add('FunctionDeclaration', transform)
  }
}
