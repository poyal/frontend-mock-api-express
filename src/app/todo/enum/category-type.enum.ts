import {EnumAbstract, Enumerable} from '@/core/enum';

@Enumerable
export class CategoryTypeEnum extends EnumAbstract {
  static readonly IMPERATIVE: CategoryTypeEnum = new CategoryTypeEnum('중요');
  static readonly TO_DO: CategoryTypeEnum = new CategoryTypeEnum('할일');
  static readonly LATER: CategoryTypeEnum = new CategoryTypeEnum('나중에');

  private constructor(description: string) {
    super(description);
  }
}
