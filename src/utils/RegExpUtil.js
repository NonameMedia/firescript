class RegExpUtil {
  static regExpEscape (arr) {
    return arr.map((item) => item.replace(/[.\\|\]*+?[(){}^$/]/g, (match) => {
      return `\\${match}`
    }))
  }
}

module.exports = RegExpUtil
