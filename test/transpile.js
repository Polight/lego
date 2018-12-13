import assert from 'assert'
import { transpile, readHTMLComponent, createJsComponent } from '../lib/transpile.js'

describe('transpile', () => {
  describe('#createJsComponent()', () => {
    it('should create a basic component with a template', () => {
      assert.equal(
        createJsComponent('x-component', 'Hey'),
        "lego('x-component', {template: `Hey`, style: ``, state: {}})"
      )
    })
    it('should create a basic component with a template and styles', () => {
      assert.equal(
        createJsComponent('x-component', 'Hey', 'stylish'),
        "lego('x-component', {template: `Hey`, style: `stylish`, state: {}})"
      )
    })
    it('should create a basic component with init function', () => {
      assert.equal(
        createJsComponent('x-component', 'Hey', 'stylish', 'this.done = true'),
        "lego('x-component', {template: `Hey`, style: `stylish`, state: {}, init: function() {this.done = true}})"
      )
    })
  })
})
