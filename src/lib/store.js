class Store {
  constructor() {
    this.state = {}
    this.subscribers = []
  }

  setState(newState) {
    this.state = { ...this.state, ...newState }
    this.notify()
  }

  subscribe(subscriber) {
    subscriber.setState(this.state)
    this.subscribers.push(subscriber)
  }

  notify() {
    this.subscribers.forEach((subscriber) => subscriber.render(this.state))
  }
}

const store = new Store()

export default store
