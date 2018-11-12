import assert from 'assert'
import jsdom from 'mocha-jsdom'

import HTMLParser from '../dist/html-parser.js'

jsdom({ url: 'http://localhost/', includeNodeLocations: true })

describe('HTMLParser', () => {
  describe('#htmlToDom()', () => {
    it('should convert an html string to DOM object', () => {
      const dom = HTMLParser.htmlToDom('<p><a></a><b></b></p>')
      assert.deepEqual(Array.from(dom.querySelectorAll('*')).map(n => n.nodeName), ['P', 'A', 'B'])
    })
  })

  describe('#evaluate()', () => {
    it('should replace string and integers in template', () => {
      const template = '${ this.name } is ${ this.age } years old'
      assert.equal(HTMLParser.evaluate(template, { name: 'John', age: 42 }), 'John is 42 years old')
    })
    it('should replace complex objects in template', () => {
      const template = '${ this.user.name } is ${ this.user.age } years old'
      assert.equal(HTMLParser.evaluate(template, { user: { name: 'John', age: 42 } }), 'John is 42 years old')
    })
    it('should ignore undefined variables', () => {
      const template = 'John is ${ this.age } years old'
      assert.equal(HTMLParser.evaluate(template), 'John is undefined years old')
    })
  })

  describe('#parseAttributeIf()', () => {
    it('should keep node when "if" attr is true', () => {
      const dom = HTMLParser.htmlToDom('<p><a>link</a><b if="true">Hey</b></p>')
      assert.equal(HTMLParser.parseAttributeIf(dom).innerHTML, '<p><a>link</a><b>Hey</b></p>')
    })
    it('should remove node when "if" attr is false', () => {
      const dom = HTMLParser.htmlToDom('<p><a>link</a><b if="false">Hey</b></p>')
      assert.equal(HTMLParser.parseAttributeIf(dom).innerHTML, '<p><a>link</a></p>')
    })
    it('should preserve deep tree node when true', () => {
      const dom = HTMLParser.htmlToDom('<p><a><b if="true">bold link</b></a></p>')
      assert.equal(HTMLParser.parseAttributeIf(dom).innerHTML, '<p><a><b>bold link</b></a></p>')
    })
    it('should remove deep tree node when false', () => {
      const dom = HTMLParser.htmlToDom('<p><a><b if="false">bold link</b></a></p>')
      assert.equal(HTMLParser.parseAttributeIf(dom).innerHTML, '<p><a></a></p>')
    })
  })

  describe('#parseAttributeFor()', () => {
    it('should remove node when list is empty', () => {
      const dom = HTMLParser.htmlToDom('<p><a for="${ url in this.urls }">link</a></p>')
      assert.equal(HTMLParser.parseAttributeFor(dom).innerHTML, '<p></p>')
    })
    it('should duplicate nodes when list has elements', () => {
      const dom = HTMLParser.htmlToDom('<p><a for="${ url in this.urls }">${ this.url }</a></p>')
      assert.equal(HTMLParser.parseAttributeFor(dom, { urls: ['localhost', 'example'] }).innerHTML, '<p><a>localhost</a><a>example</a></p>')
    })
  })

  describe('#parse()', () => {
    it('should evaluate template variables', () => {
      const template = '${ this.user.name } is ${ this.user.age } years old'
      assert.equal(HTMLParser.parse(template, { user: { name: 'John', age: 42 } }), 'John is 42 years old')
    })
    it('should evaluate template "if" and "for" attributes', () => {
      const template = '<p><a if="${ this.showLink }">link</a><b if="${ this.showStrong }">strong</b></p>'
      assert.equal(HTMLParser.parse(template, { showLink: true, showStrong: false }), '<p><a>link</a></p>')
    })
    it('should duplicate nodes when list has elements', () => {
      const template = '<p><b><a for="${ url in this.urls }">${ this.url }</a></b></p>'
      assert.equal(HTMLParser.parse(template, { urls: ['localhost', 'example'] }), '<p><b><a>localhost</a><a>example</a></b></p>')
    })
    it('should not display "for" when "if" is false', () => {
      const template = '<p>links: <a if="${ this.showLink }" for="${ url in this.urls }">${ this.url }</a></p>'
      assert.equal(HTMLParser.parse(template, { showLink: false, urls: ['localhost', 'example'] }), '<p>links: </p>')
    })
    it('should loop "for" when "if" is true', () => {
      const template = '<p>links: <a if="${ this.showLink }" for="${ url in this.urls }">${ this.url }</a></p>'
      assert.equal(HTMLParser.parse(template, { showLink: true, urls: ['localhost', 'example'] }), '<p>links: <a>localhost</a><a>example</a></p>')
    })
  })
})
