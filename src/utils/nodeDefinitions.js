const superconf = require('superconf')
const path = require('path')

const nodeDefinitions = superconf('nodeDefinitions', {
  cwd: path.join(__dirname, '../../conf')
})

function parse (definitionPattern) {
  // const patterns = definitionPattern.split(/(?<!(".+"))>/g)
  let startIndex = 0
  const len = definitionPattern.length
  const patterns = []
  let goTo = null

  for (let i = 0; i < len; i++) {
    if (goTo) {
      if (definitionPattern.charAt(i) === goTo) {
        goTo = null
      }

      continue
    }

    if (definitionPattern.charAt(i) === '>') {
      patterns.push(definitionPattern.slice(startIndex, i - 1).trim())
      startIndex = i + 1
    }

    if (definitionPattern.charAt(i) === '\\') {
      continue
    }

    if (definitionPattern.charAt(i) === '"') {
      goTo = '"'
      continue
    }

    if (definitionPattern.charAt(i) === '/') {
      goTo = '/'
      continue
    }

    if (definitionPattern.charAt(i) === '[') {
      goTo = ']'
      continue
    }
  }

  if (startIndex < len) {
    patterns.push(definitionPattern.slice(startIndex))
  }

  const mapping = patterns.map((pat) => {
    const nodeDefinition = pat.trim().match(/([a-z-]+)(?:\s+(?:"(.+?)"|\[(.+?)\]|\/(.+)\/))?/)
    // console.log('NDD', nodeDefinition)
    const value = nodeDefinition[2]
      ? nodeDefinition[2] : nodeDefinition[3]
        ? nodeDefinition[3].split(/,/g) : nodeDefinition[4]
          ? new RegExp(nodeDefinition[4]) : null

    return {
      type: nodeDefinition[1],
      value: value
    }
  })

  this.mapping = mapping

  return {
    mapping: mapping,
    test: (tokenStack) => mapping.every((definition, offset) => {
      return tokenStack.match(definition.type, definition.value || definition.valueReg, offset)
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
    const aWeight = a.weight || 0
    const bWeight = b.weight || 0
    if (aWeight > bWeight) {
      return -1
    }

    if (aWeight < bWeight) {
      return 1
    }

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
