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

// 存储所有reactive的Map
const targetsMap = new Map();

const getDep = (target, key) => {
  let depsMap = targetsMap.get(target);
  // 第一次进入
  if (!depsMap) {
    depsMap = new Map();
    targetsMap.set(target, depsMap);
  };
  let dep = depsMap.get(key);
  // 第一次进入
  if (!dep) {
    dep = new Dep();
    depsMap.set(key, dep);
  };
  return dep;
}

export const reactive = row => {
  return new Proxy(row, {
    get(target, key) {
      const dep = getDep(target, key);
      dep.depend();
      return Reflect.get(target, key);
    },
    set(target, key, value) {
      const dep = getDep(target, key);
      const result = Reflect.set(target, key, value);
      dep.notice();
      return result;
    },
  })
}