// Minimal stand-in for dist/lego.js so compiled components can be imported in tests.
export const h = (name, attrs, children) => ({ name, attrs, children })

export class Component {
  constructor() {
    this.state = {}
  }
}
