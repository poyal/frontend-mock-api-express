import {Column, Attribute, Reference} from '@/core/decorator';
import {EnumAbstract} from '@/core/enum';

import {CategoryTypeEnum} from '@/app/todo/enum/category-type.enum';

export namespace TodoEntity {
  export class Todo {
    @Attribute('id')
    @Column(() => Number)
    id!: number;

    @Attribute('title')
    @Column(() => String)
    title!: string;

    @Attribute('description')
    @Column(() => String)
    description!: string;

    @Attribute('completeYn')
    @Column(() => Boolean)
    completeYn!: boolean;

    @Attribute('endDate')
    @Reference(() => Date)
    @Column(() => Date)
    endDate!: Date;

    @Attribute('categoryType')
    @Reference(() => CategoryTypeEnum)
    @Column(() => EnumAbstract)
    categoryType!: CategoryTypeEnum;
  }
}
