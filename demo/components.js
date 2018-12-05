
 import lego from 'https://cdn.jsdelivr.net/gh/polight/lego@master/lib/index.js'
 lego('x-basic', {template: `
 <p>Component says that first name is: \${ this.state.firstName }</p>
`, style: `<style>
 p {
 color: #555;
 }
</style>`, init: function() {
 this.state.firstName = 'John'
}})
lego('x-button', {template: `
 <button on:click="this.clicked" :clicked="\${ this.state.status === 'clicked' }"><slot></slot> (\${ this.state.status })</button>
`, style: `<style>
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

</style>`, init: function() {
 this.state.status = 'unclicked'

 this.clicked = () => {
 this.state.status = this.state.status === 'unclicked' ? 'clicked' : 'unclicked'
 this.render()
 }
}})
lego('todo-list', {template: `
 <ul :if="this.state.tasks">
 <li :for="task in this.state.tasks">
 <label>
 <input type="checkbox" :checked="this.task.done" value="\${ this.task.label }" on:click="this.toggleCheck">
 <span>\${ this.task.label }</span>
 </label>
 </li>
 </ul>

 <form on:submit="this.addTask">
 <input type="text" on:input="this.updateTaskName" value="\${ this.state.taskName }" placeholder="I should implement Lego in my projects">
 <button>Add task</button>
 </form>

 <button on:click="this.save">Save my tasks</button>
`, style: `<style>
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
</style>`, init: function() {
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
 alert("Your tasks were saved for next time!")
 }
}})
