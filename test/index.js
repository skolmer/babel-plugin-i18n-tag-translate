import path from 'path'
import fs from 'fs'
import assert from 'assert'
import { transformFileSync } from '@babel/core'

function trim(str) {
  return str.replace(/^\s+|\s+$/, '')
}

describe('Translates i18n tagged template literals based on ./translation.de.json', () => {
  const fixturesDir = path.join(__dirname, 'fixtures')
  fs.readdirSync(fixturesDir).map((caseName) => {
    it(`: testing ${caseName.split('-').join(' ')}`, () => {
      const fixtureDir = path.join(fixturesDir, caseName)
      const actualPath = path.join(fixtureDir, 'actual.js')
      const actual = transformFileSync(actualPath).code

      const expected = fs.readFileSync(
          path.join(fixtureDir, 'expected.js')
      ).toString()

      assert.equal(trim(actual), trim(expected).replace(/\r\n/g, '\n'))
    })
  })
})
