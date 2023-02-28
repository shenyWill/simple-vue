import { reactive } from "./core/index.js";
export default {
  render(context) {
    const element = document.createElement('div');
    const text = document.createTextNode('hello');
    const text1 = document.createTextNode(context.obj.count);
    element.append(text);
    element.append(text1);
    return element
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