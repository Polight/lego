import lego from '/lego/index.js' lego('app-header', {template: ` <header> <h1><a href="https://github.com/vinyll/lego">Lego Web-components</a></h1> </header>
`, style: `<style> header { padding: 1rem 2rem; background-color: #eee; color: #555; }
</style>`, context: {}})
lego('user-details', {template: ` <h1>\${ this.name }</h1> <p>is \${ this.age } years old</p> <p if="\${ this.age < 60 }" class="comment">(somehow he's still young!)</p>
`, style: `<style> .comment { font-size: .8rem; color: #888; }
</style>`, context: {}}) 