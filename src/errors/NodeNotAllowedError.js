class NodeNotAllowedError extends Error {
  constructor (nodeType, parentNodeType, allowedNodes) {
    super()

    this.message = `Node ${nodeType} not allowed within a ${parentNodeType}`
  }
}

module.exports = NodeNotAllowedError
