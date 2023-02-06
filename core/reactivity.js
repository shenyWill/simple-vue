export class Dep {
  static target = null;
  constructor(value) {
    this._val = value;
    this.effects = new Set();
  }
  get value() {
    this.depend();
    return this._val;
  }
  set value(newVal) {
    this._val = newVal;
    this.notice();
  }
  // 收集依赖
  depend() {
    if (Dep.target) {
      this.effects.add(Dep.target);
    }
  }
  // 触发依赖
  notice() {
    this.effects.forEach(effect => effect());
  }
}

export const effect = (cb) => {
  Dep.target = cb;
  cb();
  Dep.target = null;
}