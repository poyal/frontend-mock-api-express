import {EnumStore} from '@/core/enum/enumerable.model';

export function Enumerable(target: any): void {
  const store: EnumStore = new EnumStore(target.prototype.constructor.name);

  Object.keys(target as object).forEach((name: string, index: number) => {
    const value: any = (target as any)[name];
    if (value instanceof target) {
      value.key = name;
      value.ordinal = index;

      store.map.set(name, value);
      store.values.push(value);
      store.keys.push(name);

      Object.freeze(value);
    }
  });

  target.store = store;

  Object.freeze(target.store);
  Object.freeze(target);

  return target;
}
