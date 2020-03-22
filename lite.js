import lego from '/lib/index.js';

lego({
  tagName: 'hello-world',
  template: `
    <div :if="this.prop.name.startsWith('M')">
    Hey joe <span>says \${this.prop.name}</span>
    </div>
    <div :else>\\\`test\\\`</div>
    <x-app></x-app>
    <style>
      span { color: red; }
    </style>
  `,
  shadowDOM: true,
});

lego({
  tagName: 'x-app',
  template: `
   <div>
  `,
  shadowDOM: false,
});
