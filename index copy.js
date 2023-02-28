// import { ref, effect } from './node_modules/@vue/reactivity/dist/reactivity.esm-browser.js';
import { Dep, effect, reactive } from './core/index.js'; 

// const a = ref(10); 
const a = new Dep(10);
let b;

effect(() => {
  b = a.value + 10;
  console.log(b);
})

a.value = 20;

const c = reactive({
  age: 24
});

let age = 0;

effect(() => {
  age = c.age + 1;
  console.log(age);
})

c.age++;


const App = {
  render(context) {
    effect(() => {
      document.querySelector('#app').textContent = ``;
      const element = document.createElement('div');
      const text = document.createTextNode('hello');
      const text1 = document.createTextNode(context.obj.count);
      element.append(text);
      element.append(text1);
      document.querySelector('#app').append(element);
    })
  },
  setup() {
    const obj = reactive({
      count: 1,
    });
    // 方便在控制台演示
    window.obj = obj;
    return {
      obj,
    }
  }
}

App.render(App.setup());