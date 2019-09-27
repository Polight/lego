
 import Component from '../lib/index.js'
 
class XBasic extends Component {
 static get observedAttributes() {
 return []
 }
 get template () {
 return `<p>Component says that first name is: \${ this.firstName }</p>`
 }
 get style () {
 return `<style>
 p {
 color: #555;
 }
</style>`
 }
 _init () {
 
 this.state.firstName = 'John'

 }
}

customElements.define('x-basic', XBasic)


class ColorChanger extends Component {
 static get observedAttributes() {
 return ["color"]
 }
 get template () {
 return `<p>color is \${ this.color }</p>`
 }
 get style () {
 return `<style>
 root {
 display: inline-block;
 padding: 2rem .1rem .1rem 3rem;
 color: white;
 width: 200px;
 background-color: \${ this.color };
 }
 p { margin: 0 }
</style>`
 }
 _init () {
 null
 }
}

customElements.define('color-changer', ColorChanger)


class XButton extends Component {
 static get observedAttributes() {
 return []
 }
 get template () {
 return `<button on:click="this.clicked" :clicked="\${ this.status === 'clicked' }"><slot></slot> (\${ this.status })</button>`
 }
 get style () {
 return `<style>
 button {
 padding: 1rem 2rem;
 border: 1px solid #555;
 border-radius: .5rem;
 background-color: #eee;
 cursor: pointer;
 }
 [clicked] {
 background-color: #c99;
 }

</style>`
 }
 _init () {
 
 this.state.status = 'unclicked'

 this.clicked = () => {
 this.state.status = this.state.status === 'unclicked' ? 'clicked' : 'unclicked'
 this.render()
 }

 }
}

customElements.define('x-button', XButton)


class TodoList extends Component {
 static get observedAttributes() {
 return ["namer"]
 }
 get template () {
 return `<ul :if="this.tasks">
 <li :for="task in this.tasks">
 <label>
 <input type="checkbox" :checked="this.task.done" value="\${ this.task.label }" on:click="this.toggleCheck">
 <span>\${ this.task.label }</span>
 </label>
 </li>
 </ul>

 <form on:submit="this.addTask">
 <input type="text" on:input="this.updateTaskName" value="\${ this.taskName }" placeholder="Type a task to be done…">
 <button>Add task</button>
 </form>

 <button on:click="this.save">Save my tasks</button>`
 }
 get style () {
 return `<style>
 [type=text] {
 padding: .5rem;
 width: 50%;
 font: inherit;
 }
 [checked] + span {
 text-decoration: line-through;
 }
 button {
 font: inherit;
 display: block;
 margin-top: 1rem;
 }
</style>`
 }
 _init () {
 
 this.state.tasks = JSON.parse(localStorage.getItem('todo-list-demo')) || []
 this.state.taskName = ''

 this.addTask = (event) => {
 event.preventDefault()
 const label = this.state.taskName
 if (!label) return
 this.state.tasks.push({ label, done: false })
 this.state.taskName = ''
 this.render()
 }

 this.updateTaskName = (event) => {
 this.state.taskName = event.target.value
 }

 this.toggleCheck = (event) => {
 const index = this.state.tasks.findIndex(t => t.label === event.target.value)
 this.state.tasks[index].done = event.target.checked
 this.render()
 }

 this.save = () => {
 localStorage.setItem('todo-list-demo', JSON.stringify(this.state.tasks))
 alert("Your tasks were saved. You can even refresh your browser!")
 }

 }
}

customElements.define('todo-list', TodoList)


class XClock extends Component {
 static get observedAttributes() {
 return []
 }
 get template () {
 return `<p>Current time is <span>\${ this.time }</span></p>`
 }
 get style () {
 return `<style>
 span {
 padding: .2rem;
 color: white;
 font-family: Monospace;
 background-color: black;
 }
</style>`
 }
 _init () {
 
 this.setState({ time: getTime() })

 setInterval(() => this.render({time: getTime()}), 1000)

 function getTime() {
 return (new Date()).toLocaleTimeString()
 }

 }
}

customElements.define('x-clock', XClock)

 