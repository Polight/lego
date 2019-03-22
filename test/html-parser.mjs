import assert from 'assert'

import HTMLParser from '../lib/html-parser'

describe('HTMLParser', () => {
  describe('#htmlToDom()', () => {
    it('should convert an html string to DOM object', () => {
      const dom = HTMLParser.htmlToDom('<p><a></a><b></b></p>')
      assert.deepEqual(Array.from(dom.querySelectorAll('*')).map(n => n.nodeName), ['P', 'A', 'B'])
    })
  })

  describe('#evaluateString()', () => {
    it('should replace string with value of context', () => {
      assert.equal(HTMLParser.evaluateString('this.name', { name: 'John' }), 'John')
    })
    it('should replace complex objects in string', () => {
      assert.equal(HTMLParser.evaluateString('this.user.name', { user: { name: 'John' } }), 'John')
    })
    it('should ignore undefined variables', () => {
      assert.equal(HTMLParser.evaluateString('this.user'), '')
    })
  })

  describe('#evaluateLiteral()', () => {
    it('should replace string and integers in template', () => {
      const template = '${ this.name } is ${ this.age } years old'
      assert.equal(HTMLParser.evaluateLiteral(template, { name: 'John', age: 42 }), 'John is 42 years old')
    })
    it('should replace complex objects in template', () => {
      const template = '${ this.user.name } is ${ this.user.age } years old'
      assert.equal(HTMLParser.evaluateLiteral(template, { user: { name: 'John', age: 42 } }), 'John is 42 years old')
    })
    it('should ignore undefined variables', () => {
      const template = 'John is ${ this.nothing } years old'
      assert.equal(HTMLParser.evaluateLiteral(template), 'John is undefined years old')
    })
  })

  describe('#parseAttributeIf()', () => {
    it('should keep node when "if" attr is true', () => {
      const dom = HTMLParser.htmlToDom('<p><a>link</a><b :if="true">Hey</b></p>')
      assert.equal(HTMLParser.parseAttributeIf(dom).innerHTML, '<p><a>link</a><b>Hey</b></p>')
    })
    it('should remove node when "if" attr is false', () => {
      const dom = HTMLParser.htmlToDom('<p><a>link</a><b :if="false">Hey</b></p>')
      assert.equal(HTMLParser.parseAttributeIf(dom).innerHTML, '<p><a>link</a></p>')
    })
    it('should preserve deep tree node when true', () => {
      const dom = HTMLParser.htmlToDom('<p><a><b :if="true">bold link</b></a></p>')
      assert.equal(HTMLParser.parseAttributeIf(dom).innerHTML, '<p><a><b>bold link</b></a></p>')
    })
    it('should remove deep tree node when false', () => {
      const dom = HTMLParser.htmlToDom('<p><a><b :if="false">bold link</b></a></p>')
      assert.equal(HTMLParser.parseAttributeIf(dom).innerHTML, '<p><a></a></p>')
    })
    it('should not evaluate content of "if" when false', () => {
      const template = '<p :if="false">${ this.doesNotExist }</p>'
      assert.equal(HTMLParser.parse(template, {}), '')
    })
  })

  describe('#parseAttributeBoolean()', () => {
    it('should create valid attribute when boolean is true', () => {
      const dom = HTMLParser.htmlToDom('<p><b :selected="true">Hey</b></p>')
      assert.equal(HTMLParser.parseAttributeBoolean(dom).innerHTML, '<p><b selected="selected">Hey</b></p>')
    })
    it('should remove attribute when boolean is false', () => {
      const dom = HTMLParser.htmlToDom('<p><b :selected="false">Hey</b></p>')
      assert.equal(HTMLParser.parseAttributeBoolean(dom).innerHTML, '<p><b>Hey</b></p>')
    })
  })

  describe('#deflateAttributesFor() / #parseDeflatedFors()', () => {
    it('should remove node when list is empty', () => {
      const dom = HTMLParser.htmlToDom('<p><a :for="url in this.urls">link</a></p>')
      assert.equal(HTMLParser.parseDeflatedFors(HTMLParser.deflateAttributesFor(dom)).innerHTML, '<p></p>')
    })
    it('should duplicate nodes when list has elements', () => {
      const dom = HTMLParser.htmlToDom('<p><a :for="url in this.urls">${ this.url }</a></p>')
      const context = { urls: ['localhost', 'example'] }
      assert.equal(HTMLParser.parseDeflatedFors(HTMLParser.deflateAttributesFor(dom, context), context).innerHTML, '<p><a>localhost</a><a>example</a></p>')
    })
    it('should evaluate nested if in loop', () => {
      const template = 'Hey <p :for="user in this.users"><em :if="this.user.name">${ this.user.name }</em><no :if="this.user.nothing"></no></p>'
      assert.equal(HTMLParser.parse(template, { users: [{ name: 'John' }] }), 'Hey <p><em>John</em></p>')
    })
  })

  describe('#parse()', () => {
    it('should evaluate template variables', () => {
      const template = '${ this.user.name } is ${ this.user.age } years old'
      assert.equal(HTMLParser.parse(template, { user: { name: 'John', age: 42 } }), 'John is 42 years old')
    })
    it('should evaluate template nested "if" attributes', () => {
      const template = '<p><a :if="this.showLink">link</a><b :if="this.showStrong">strong</b></p>'
      assert.equal(HTMLParser.parse(template, { showLink: true, showStrong: false }), '<p><a>link</a></p>')
    })
    it('should evaluate template boolean attribute', () => {
      const template = '<p><a :if="this.showLink" :selected="this.isSelected">link</a></p>'
      assert.equal(HTMLParser.parse(template, { showLink: true, showStrong: false, isSelected: true }), '<p><a selected="selected">link</a></p>')
    })
    it('should duplicate nodes when list has elements', () => {
      const template = '<p><b><a :for="url in this.urls">${ this.url }</a></b></p>'
      assert.equal(HTMLParser.parse(template, { urls: ['localhost', 'example'] }), '<p><b><a>localhost</a><a>example</a></b></p>')
    })
    it('should not display "for" when "if" is false', () => {
      const template = '<p>links: <a :if="this.showLink" :for="url in this.urls">${ this.url }</a></p>'
      assert.equal(HTMLParser.parse(template, { showLink: false, urls: ['localhost', 'example'] }), '<p>links: </p>')
    })
    it('should loop "for" when "if" is true', () => {
      const template = '<p>links: <a :if="this.showLink" :for="url in this.urls">${ this.url }</a></p>'
      assert.equal(HTMLParser.parse(template, { showLink: true, urls: ['localhost', 'example'] }), '<p>links: <a>localhost</a><a>example</a></p>')
    })
    it('should loop "for" and evaluate nested "if" with subContext', () => {
      const template = '<p :for="url in this.urls"><a :if="this.url !== \'localhost\'">${ this.url }</a></p>'
      assert.equal(HTMLParser.parse(template, { urls: ['localhost', 'example'] }), '<p></p><p><a>example</a></p>')
    })
  })

  describe('#registerListeners()', () => {
    it('should remove an attribute with `on--` when converting into a listener', () => {
      const dom = HTMLParser.htmlToDom('<p><a on--click="this.click">link</a></p>')
      assert.equal(HTMLParser.registerListeners(dom, { click: () => 'clicked' }).innerHTML, '<p><a>link</a></p>')
    })
  })
})
