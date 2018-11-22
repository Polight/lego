import path from 'path'
import assert from 'assert'

import { walkDir, escapeLiteral } from '../lib/utils.js'

describe('utils', () => {
  describe('#walkDir()', () => {
    it('should recursively retrieve all paths from a directory', async () => {
      const dirname = path.resolve(__dirname + '/../test')
      const dirs = await walkDir(dirname)
      assert.deepEqual(dirs.sort(), [
        dirname,
        `${dirname}/fixtures`,
        `${dirname}/fixtures/x-basic.html`,
        `${dirname}/fixtures/x-scripted.html`,
        `${dirname}/html-parser.js`,
        `${dirname}/utils.js`,
        `${dirname}/index.js`,
        `${dirname}/transpile.js`,
      ].sort())
    })

    it('should recursively retrieve files from a directory', async () => {
      const dirname = path.resolve(__dirname + '/../test')
      const dirs = await walkDir(dirname, ['js'])
      assert.deepEqual(dirs.sort(), [
        `${dirname}/html-parser.js`,
        `${dirname}/utils.js`,
        `${dirname}/index.js`,
        `${dirname}/transpile.js`,
      ].sort())
    })
  })

  describe('#escapeLiteral()', () => {
    it('should escape ${} template', () => {
      assert.equal(escapeLiteral('${name} is ${age}'), '\\${name} is \\${age}')  // Single backslash!
    })
  })
})
