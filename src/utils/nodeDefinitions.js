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

/**
 * Sort definitions
 *
 * higher count of ">"
 * has key + value
 */
function parseDefinitions (nodeDefinitions) {
  return Object.entries(nodeDefinitions.nodes).map(([ mapping, definition ]) => {
    return Object.assign(parse(mapping), definition)
  }).sort((a, b) => {
    if (a.mapping.length > b.mapping.length) {
      return -1
    }

    if (a.mapping.length === b.mapping.length) {
      for (let i = 0; i < a.mapping.length; i++) {
        if (a.mapping[i].value && !b.mapping[i].value) {
          return -1
        }

        if (!a.mapping[i].value && b.mapping[i].value) {
          return 1
        }

        // sort longer value up
        if (a.mapping[i].value && b.mapping[i].value) {
          if (a.mapping[i].value.length > b.mapping[i].value.length) {
            return -1
          }

          if (a.mapping[i].value.length < b.mapping[i].value.length) {
            return 1
          }
        }
      }

      return 0
    }

    return 1
  })
}

const definitionMappings = parseDefinitions(nodeDefinitions)

module.exports = definitionMappings
module.exports.parse = parse
module.exports.parseDefinitions = parseDefinitions
