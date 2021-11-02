
// Lego version undefined
import { h, Component } from '../../dist/lego.min.js'

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
    @import url('https://google.com.style.css');
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

import {store} from 'store'

export default class Lego {}
