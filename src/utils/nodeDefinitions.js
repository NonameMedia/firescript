const superconf = require('superconf')
const path = require('path')

const nodeDefinitions = superconf('nodeDefinitions', {
  cwd: path.join(__dirname, '../../conf')
})

function parse (definitionPattern) {
  const patterns = definitionPattern.split(/>/g)

  const mapping = patterns.map((pat) => {
    const nodeDefinition = pat.trim().match(/([a-z-]+)(?:\s+"(.+?)")?/)
    return {
      type: nodeDefinition[1],
      value: nodeDefinition[2]
    }
  })

  this.mapping = mapping

  return {
    mapping: mapping,
    test: (tokenStack) => mapping.every((definition, offset) => {
      return tokenStack.expect(definition.type, definition.value, offset)
    })
  }
}

const definitionMappings = Object.entries(nodeDefinitions.nodes).map(([ mapping, definition ]) => {
  return Object.assign(parse(mapping), definition)
})

module.exports = definitionMappings
module.exports.parse = parse
