class NodeNotAllowedError extends Error {
  constructor (nodeType, parentNodeType, allowedNodes) {
    super()

    this.message = `Node ${nodeType} not allowed within a ${parentNodeType} ` +
      `allowed types are: ${allowedNodes.join(', ')}`
  }
}

module.exports = NodeNotAllowedError
