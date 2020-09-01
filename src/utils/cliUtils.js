const colorfy = require('colorfy')

function colorizeParseError (err) {
  if (!err.code === 'FIRESCRIPT_PARSE_ERROR') {
    return err
  }

  const sourcePreview = err.source.split('\n').map((line) => {
    const chunks = line.split('|')
    if (chunks[0] === 'x') {
      return chunks[0] + colorfy.grey('|') + chunks[1].replace('^', colorfy.yellow('^'))
    }

    return chunks[0] + colorfy.grey('|') + chunks[1]
  })

  return sourcePreview.join('\n')
}

module.exports.colorizeParseError = colorizeParseError
