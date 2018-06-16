const int = FSInt(num)

function FSInt (val, type) {
  if (typeof val === 'number') {
    return val
  }

  const curType = typeof val
  throw new TypeError(`${DATA_TYPES[type]} expected, but a ${curType} was given`)
}
