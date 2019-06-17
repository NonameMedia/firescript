const superconf = require('superconf')

class NodeMapping {
  constructor (opts) {
    opts = opts || {}

    this.confDir = opts.confDir
    if (!this.confDir) {
      throw new Error('The Parser.confDir parameter must be set!')
    }

    console.log('PATH', this.confDir)
    const nodeMapping = superconf('nodeMapping', {
      cwd: this.confDir
    })

    this.nodeMapping = this.parseMapping(nodeMapping.mapping)
  }

  parse (mappingPattern) {
    // const patterns = mappingPattern.split(/(?<!(".+"))>/g)
    let startIndex = 0
    // const node = mappingPattern.slice(0, startIndex)
    const len = mappingPattern.length
    const patterns = []
    let goTo = null

    for (let i = 0; i < len; i++) {
      if (goTo) {
        if (mappingPattern.charAt(i) === goTo) {
          goTo = null
        }

        continue
      }

      if (mappingPattern.charAt(i) === '>') {
        patterns.push(mappingPattern.slice(startIndex, i - 1).trim())
        startIndex = i + 1
      }

      if (mappingPattern.charAt(i) === '\\') {
        continue
      }

      if (mappingPattern.charAt(i) === '"') {
        goTo = '"'
        continue
      }

      if (mappingPattern.charAt(i) === '/') {
        goTo = '/'
        continue
      }

      if (mappingPattern.charAt(i) === '[') {
        goTo = ']'
        continue
      }
    }

    if (startIndex < len) {
      patterns.push(mappingPattern.slice(startIndex))
    }

    const mapping = patterns.map((pat) => {
      const nodeMapping = pat.trim().match(/([a-zA-Z-]+)(?:\s+(?:"(.+?)"|\[(.+?)\]|\/(.+)\/))?/)
      // console.log('NDD', nodeMapping)
      const value = nodeMapping[2]
        ? nodeMapping[2] : nodeMapping[3]
          ? nodeMapping[3].split(/,/g) : nodeMapping[4]
            ? new RegExp(nodeMapping[4]) : null

      if (/^[A-Z]/.test(nodeMapping[1])) {
        return {
          node: nodeMapping[1]
        }
      }

      return {
        type: nodeMapping[1],
        value: value
      }
    })

    this.mapping = mapping

    return {
      mapping: mapping,
      // test: (token) => mapping.every((definition, offset) => {
      //   if (!token) {
      //     return false
      //   }
      //
      //   if (definition.value && Array.isArray(definition.value)) {
      //     return definition.value.indexOf(token.value) >= 0
      //   } else if (definition.value && definition.value instanceof RegExp) {
      //     return definition.value.test(token.value)
      //   } else if (definition.value && token.value !== definition.value) {
      //     return false
      //   }
      //
      //   return Array.isArray(definition.type)
      //     ? definition.type.some((t) => t === token.type)
      //     : token.type === definition.type
      // })
      test: (node, tokenBuffer) => mapping.every((definition, offset) => {
        // console.log('TESTMATCH', definition, offset)
        return node.type === definition.node && tokenBuffer.match(definition.type, definition.value || definition.valueReg, offset)
      })
    }
  }

  /**
   * Sort definitions
   *
   * higher count of ">"
   * has key + value
   */
  parseMapping (nodeMapping) {
    return Object.entries(nodeMapping).map(([ mapping, definition ]) => {
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

        return 0
      }

      return 1
    })
  }

  resolve (node, tokenBuffer) {
    const definition = this.nodeMapping.find((mapping, index) => {
      if (!mapping.test(node, tokenBuffer)) {
        return false
      }

      return (!mapping.scopes && mapping.name) || mapping.scopes[this.type] || mapping.name
    })

    if (definition) {
      if (definition.scopes && definition.scopes[this.type]) {
        return definition.scopes[this.type]
      }

      return definition.name
    }
  }
}

module.exports = NodeMapping
