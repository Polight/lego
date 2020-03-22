import lego from '/lib/index.js';


lego({
 tagName: 'x-basic',
 template: `
 <p>Component says that first name is: \${ this.firstname }</p>
<style>
 p {
 color: #555;
 }
</style>`,
 shadowDOM: true,
 data: {"firstname":"dude"},
 created() {
 
 }
});
