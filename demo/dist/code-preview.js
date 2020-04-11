
import { h, Component } from 'https://unpkg.com/@polight/brick/lib'

class CodePreview extends Component {
  get vdom() {
    return ({ state }) => [
  h("code", {"id": `code`}, [
    h("pre", {}, `${state.code}`)
]),
  h("div", {"id": `preview`}, `
    ${state.code}
  `)]
  }
  get vstyle() {
    return ({ state }) => h('style', {}, `
    root {
    display: flex;
    width: 100%;
  }
  root > * {
    width: 50%;
  }
  #code {
    background-color: #333;
    color: white;
    font-family: Monospace;
    padding: 0 1rem;
  }
  #preview {
    background-color: #f5f5f5;
    padding: 2rem;
    box-shadow: 1px 1px 3px rgba(0, 0, 0, .3);
  }
  `)}
  init() {
    this.state = {
      code: ''
    }
  }
  connected() {
    const source = this.document.host.innerHTML
    this.state.code = source
    this.document.getElementById('preview').innerHTML = source
  }
}

export default customElements.define('code-preview', CodePreview)
