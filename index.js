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