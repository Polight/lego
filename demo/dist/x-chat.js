
// Lego version 1.6.7
import { h, Component } from 'https://unpkg.com/@polight/lego/dist/lego.min.js'

class Lego extends Component {
  get vdom() {
    return ({ state }) => [
  h("header", {},     h("p", {}, `Header`)),
  h("main", {}, [
    h("nav", {}, [
    h("p", {}, `Sidebar 1`)
]),
    h("article", {}, [
    h("p", {}, `Main content of the page`)
]),
    h("aside", {}, [
    h("p", {}, `Sidebar 2`)
])
]),
  h("footer", {}, [
    h("p", {}, `Footer`)
])]
  }
  get vstyle() {
    return ({ state }) => h('style', {}, `
    
    :host {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  main {
    flex-grow: 1;
    display: flex;
    flex-direction: row;
  }
  article {
    flex-grow: 1;
  }
  nav,
  aside {
    width: 25%;
  }
  `)}
}



export default class extends Lego {}
