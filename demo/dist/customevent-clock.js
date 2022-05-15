
// Lego version 1.6.7
import { h, Component } from 'https://unpkg.com/@polight/lego/dist/lego.min.js'

class Lego extends Component {
  get vdom() {
    return ({ state }) => [
  h("p", {}, `Current time: ${state.time || '...'}`)]
  }
  
}



export default class extends Lego {
    init() {
      this.state = {
        time: null,
      }

      setInterval(() => {
        this.dispatchEvent(new CustomEvent('tick', { detail: { time: new Date() } }))
      }, 1000)

      this.addEventListener('tick', ({ detail: {time} }) => {
        this.render({ time: time.toLocaleTimeString() })
      })
    }
  }
