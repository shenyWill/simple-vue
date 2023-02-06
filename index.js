// import { ref, effect } from './node_modules/@vue/reactivity/dist/reactivity.esm-browser.js';
import { Dep, effect } from './core/index.js'; 

// const a = ref(10); 
const a = new Dep(10);
let b;

effect(() => {
  b = a.value + 10;
  console.log(b);
})

a.value = 20;


