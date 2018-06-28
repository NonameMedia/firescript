const inspect = require('inspect.js')
const path = require('path')
const firescript = require('../../')

describe('Module loaging', () => {
  describe('named export', () => {
    before(() => {
      const fsSource = inspect.readFile(path.join(__dirname, '../fixtures/modules/fs/namedExport.fire'))
      const cjsSource = firescript.transpile(fsSource, {
        features: {
          esMoules: false
        },
        type: 'fire'
      })

      inspect.writeFile(path.join(__dirname, '../tmp/modules/fs-transformed/namedExport.js'), cjsSource)
    })

    it('import FS into a CommonJS module (named-import)', () => {
      const cjs = require('../fixtures/modules/cjs/namedImport')

      inspect(cjs).isEql({
        banana: 'Banana',
        __esModule: true
      })
    })
  })

  describe('default export', () => {
    before(() => {
      const fsSource = inspect.readFile(path.join(__dirname, '../fixtures/modules/fs/defaultExport.fire'))
      const cjsSource = firescript.transpile(fsSource, {
        features: {
          esMoules: false
        },
        type: 'fire'
      })

      inspect.writeFile(path.join(__dirname, '../tmp/modules/fs-transformed/defaultExport.js'), cjsSource)
    })

    it('import FS into a CommonJS module (default-import)', () => {
      const cjs = require('../fixtures/modules/cjs/defaultImport')

      inspect(cjs).isEql({
        default: 'Banana',
        __esModule: true
      })
    })
  })

  describe('class export', () => {
    before(() => {
      const fsSource = inspect.readFile(path.join(__dirname, '../fixtures/modules/fs/classExport.fire'))
      const cjsSource = firescript.transpile(fsSource, {
        features: {
          esMoules: false
        },
        type: 'fire'
      })

      inspect.writeFile(path.join(__dirname, '../tmp/modules/fs-transformed/classExport.js'), cjsSource)
    })

    it('import FS into a CommonJS module (class-import)', () => {
      const cjs = require('../fixtures/modules/cjs/classImport')

      inspect(cjs).hasKey('Banana')
      inspect(cjs.Banana).isClass()
    })
  })

  describe('function export', () => {
    before(() => {
      const fsSource = inspect.readFile(path.join(__dirname, '../fixtures/modules/fs/functionExport.fire'))
      const cjsSource = firescript.transpile(fsSource, {
        features: {
          esMoules: false
        },
        type: 'fire'
      })

      inspect.writeFile(path.join(__dirname, '../tmp/modules/fs-transformed/functionExport.js'), cjsSource)
    })

    it('import FS into a CommonJS module (function-import)', () => {
      const cjs = require('../fixtures/modules/cjs/functionImport')

      inspect(cjs).hasKey('getBanana')
      inspect(cjs.getBanana).isFunction()
    })
  })

  describe('variable export', () => {
    before(() => {
      const fsSource = inspect.readFile(path.join(__dirname, '../fixtures/modules/fs/variableExport.fire'))
      const cjsSource = firescript.transpile(fsSource, {
        features: {
          esMoules: false
        },
        type: 'fire'
      })

      inspect.writeFile(path.join(__dirname, '../tmp/modules/fs-transformed/variableExport.js'), cjsSource)
    })

    it('import FS into a CommonJS module (variable-import)', () => {
      const cjs = require('../fixtures/modules/cjs/variableImport')

      inspect(cjs).isEql({
        banana: 'Banana',
        coconut: 'Coconut',
        pear: 'Pear',
        __esModule: true
      })
    })
  })
})
