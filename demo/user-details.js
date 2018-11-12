
import lego from '/lego/index.js'

lego('user-details', {
  template: `
  <h1>\${ this.name }</h1>
  <p>is \${ this.age } years old</p>

  <p if="\${ this.age < 60 }" class="comment">(somehow he's still young!)</p>
`,
  style: `<style>
  .comment {
    font-size: .8rem;
    color: #888;
  }
</style>`,
  context: {}
})
