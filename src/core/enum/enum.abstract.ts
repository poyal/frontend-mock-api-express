import {EnumStore} from '@/core/enum/enumerable.model';

export class EnumAbstract {
  static get keys(): string[] {
    return this.store.keys;
  }

  static get values(): EnumAbstract[] {
    return this.store.values;
  }

  static valueOf(key: string): EnumAbstract | undefined {
    return this.store.map.get(key);
  }

  static instanceOf(instance: EnumAbstract): EnumAbstract | undefined {
    return !!instance ? this.store.map.get(instance.key) : undefined;
  }

  static has(key: string): boolean {
    return this.store.map.has(key);
  }

  private static readonly store: EnumStore;

  readonly key!: string;
  readonly ordinal!: number;

  constructor(readonly description: string) {
  }

  equal(key: string): boolean {
    return this.key === key;
  }

  toString(): string {
    return `${this.constructor.name}.${this.key}`;
  }
}
