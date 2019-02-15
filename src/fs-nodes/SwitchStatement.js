const FirescriptNode = require('./FirescriptNode')

class SwitchStatement extends FirescriptNode {
  constructor (tokenStack, parent) {
    super(tokenStack, parent)

    if (!tokenStack.expect('keyword', 'switch')) {
      this.syntaxError('Unexpected token, switch keyword expected', tokenStack.current())
    }

    tokenStack.goForward()
    this.discriminant = this.createFullNode(tokenStack)

    if (!tokenStack.expect('indention')) {
      this.syntaxError('Unexpected token')
    }

    const childIndention = tokenStack.getIndention()
    tokenStack.goForward()

    this.cases = []

    let hasDefault = false
    while (true) {
      const nextToken = tokenStack.current()
      if (!nextToken) {
        break
      }

      if (nextToken.type === 'indention' && nextToken.value < childIndention) {
        tokenStack.goForward()
        break
      }

      if (tokenStack.expect('keyword', 'case') && hasDefault) {
        this.syntaxError('Case clause not allowed after a default clause', tokenStack.current())
      } else if (tokenStack.expect('keyword', 'default')) {
        hasDefault = true
      }

      this.cases.push(this.createSwitchCaseNode(tokenStack))
      if (tokenStack.getIndention() === childIndention) {
        continue
      }

      break
    }
  }

  toJSON (ctx) {
    return this.createJSON(ctx, {
      type: 'SwitchStatement',
      discriminant: this.discriminant.toJSON(ctx),
      cases: this.cases.map((item) => item.toJSON(ctx))
    })
  }
}

module.exports = SwitchStatement
