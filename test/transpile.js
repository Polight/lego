import assert from 'assert'
import { transpile, readHTMLComponent, createJsComponent } from '../lego/transpile.js'

describe('transpile', () => {
  describe('#createJsComponent()', () => {
    it('should create a basic component with a template', () => {
      assert.equal(
        createJsComponent('x-component', 'Hey'),
        "lego('x-component', {template: `Hey`, style: ``, context: {}})"
      )
    })
    it('should create a basic component with a template and styles', () => {
      assert.equal(
        createJsComponent('x-component', 'Hey', 'stylish'),
        "lego('x-component', {template: `Hey`, style: `stylish`, context: {}})"
      )
    })
  })
})
