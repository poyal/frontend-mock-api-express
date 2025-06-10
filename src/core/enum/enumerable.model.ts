import {EnumAbstract} from '@/core/enum/enum.abstract';

export class EnumStore {
  name: string;
  keys: string[] = [];
  map: Map<string, EnumAbstract> = new Map<string, EnumAbstract>();
  values: EnumAbstract[] = [];

  constructor(name: string) {
    this.name = name;
  }
}
