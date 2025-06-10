import {EnumAbstract, Enumerable} from '@/core/enum';

@Enumerable
export class TypeBEnum extends EnumAbstract {
  static readonly TYPE_B_1: TypeBEnum = new TypeBEnum('타입B 1');
  static readonly TYPE_B_2: TypeBEnum = new TypeBEnum('타입B 2');
  static readonly TYPE_B_3: TypeBEnum = new TypeBEnum('타입B 3');
  static readonly TYPE_B_4: TypeBEnum = new TypeBEnum('타입B 4');

  private constructor(description: string) {
    super(description);
  }
}
