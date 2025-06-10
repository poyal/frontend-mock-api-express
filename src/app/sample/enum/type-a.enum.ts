import {EnumAbstract, Enumerable} from '@/core/enum';

@Enumerable
export class TypeAEnum extends EnumAbstract {
  static readonly TYPE_A_1: TypeAEnum = new TypeAEnum('타입A 1');
  static readonly TYPE_A_2: TypeAEnum = new TypeAEnum('타입A 2');
  static readonly TYPE_A_3: TypeAEnum = new TypeAEnum('타입A 3');
  static readonly TYPE_A_4: TypeAEnum = new TypeAEnum('타입A 4');

  private constructor(description: string) {
    super(description);
  }
}
