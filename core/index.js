export { Dep, effect, reactive } from './reactivity.js';
import { effect } from "./reactivity.js";

export const createApp = (rootComponent) => ({
  mount(rootContainer) {
    const setupResult = rootComponent.setup();
    effect(() => {
      rootContainer.textContent = ``;
      const element = rootComponent.render(setupResult);
      rootContainer.append(element);
    })
  },
})