const superconf = require('superconf')

class NodeDefinition {
  constructor (opts) {
    opts = opts || {}

    this.confDir = opts.confDir
    if (!this.confDir) {
      throw new Error('The Parser.confDir parameter must be set!')
    }

    const nodeDefinition = superconf('nodeDefinition', {
      cwd: this.confDir
    })

    this.nodeDefinition = this.parseDefinition(nodeDefinition.definition)
    this.keywords = nodeDefinition.keywords
  }

  parse (definitionPattern) {
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
      test: (tokenBuffer) => mapping.every((definition, offset) => {
        return tokenBuffer.match(definition.type, definition.value || definition.valueReg, offset)
      })
    }
  }

  /**
   * Sort definitions
   *
   * higher count of ">"
   * has key + value
   */
  parseDefinition (nodeDefinition) {
    return Object.entries(nodeDefinition).map(([ mapping, definition ]) => {
      return Object.assign(this.parse(mapping), definition)
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

        if (a.mapping[0].value === 'keyword' && b.mapping[0].value === 'identifier') {
          return -1
        } else if (a.mapping[0].value === 'identifier' && b.mapping[0].value === 'keyword') {
          return 1
        }

        return 0
      }

      return 1
    })
  }

  resolve (tokenBuffer, scope = {}) {
    const definition = this.nodeDefinition.find((mapping, index) => {
      if (!mapping.test(tokenBuffer)) {
        return false
      }

      return (!mapping.scopes && mapping.name) || mapping.scopes[scope.type] || mapping.name
    })

    if (definition) {
      if (definition.scopes && definition.scopes[scope.type]) {
        if (!scope.type) {
          throw new Error('Scope is not set!')
        }

        return definition.scopes[scope.type]
      }

      return definition.name
    }
  }
}

module.exports = NodeDefinition
