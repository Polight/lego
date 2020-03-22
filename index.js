import Component from "./lib/Component.js";

class XApp extends Component {

  static get observedAttributes() {
    return ['number']
  }

  clicked(event) {
    console.info('button clicked!', event.target.value)
  }

  over(event) {
    console.info('over button…')
  }

  get template() {
    this.state.users = [
      {name:'boris'},
      {name:'vian'},
    ]
    return `
      <h1>App \${state.number}</h1>
      <p>Current users:</p>
      <x-user :for="user in state.users" name="\${user.name}"></x-user>
      <button @click="clicked" @mouseover="over" value=3>log event</button>
    `
  }
}


class XUser extends Component {

  static get observedAttributes() {
    return ['name']
  }
  get template() {
    return `
      <p><span>\${ state.name }'s</span> profile</p>
    `
  }

  get style() {
    return `
      <style>
        span { font-weight: bold }
      </style>
    `
  }
}

export default [
  customElements.define('x-user', XUser),
  customElements.define('x-app', XApp),
]
