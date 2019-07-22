class TemplateNotFoundError extends Error {
  constructor (tmplName) {
    super()

    this.message = `Template ${tmplName} not found in esx templates!`
  }
}

module.exports = TemplateNotFoundError
