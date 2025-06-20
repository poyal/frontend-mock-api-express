import {Column, Attribute, Reference, DateFormat} from '@/core/decorator';
import {EnumAbstract} from '@/core/enum';

import {TypeAEnum} from '@/app/sample/enum/type-a.enum';
import {TypeBEnum} from '@/app/sample/enum/type-b.enum';

export namespace SampleEntity {
  export class Sample {
    @Attribute('id')
    @Column(() => Number)
    id!: number;

    @Attribute('name')
    @Column(() => String)
    name!: string;

    @Attribute('flag')
    @Column(() => Boolean)
    flag!: boolean;

    @Attribute('enumA')
    @Reference(() => TypeAEnum)
    @Column(() => EnumAbstract)
    enumA!: TypeAEnum;

    @Attribute('enumB')
    @Reference(() => TypeBEnum)
    @Column(() => EnumAbstract)
    enumB!: TypeBEnum;

    @Attribute('date')
    @Reference(() => Date)
    @Column(() => Date)
    @DateFormat('YYYYMMDD')
    date!: Date;

    @Attribute('dateTime')
    @Reference(() => Date)
    @Column(() => Date)
    @DateFormat('YYYY/MM/DD HH:mm:ss')
    dateTime!: Date;

    @Attribute('time')
    @Reference(() => Date)
    @Column(() => Date)
    @DateFormat('HH~mm~ss')
    time!: Date;

    @Attribute('item')
    @Reference(() => SampleEntity.Item)
    @Column(() => Object)
    item!: SampleEntity.Item;

    @Attribute('items')
    @Reference(() => SampleEntity.Item)
    @Column(() => Array)
    items!: SampleEntity.Item[];
  }

  export class Item {
    @Attribute('id')
    @Column(() => Number)
    id!: number;

    @Attribute('name')
    @Column(() => String)
    name!: string;

    @Attribute('flag')
    @Column(() => Boolean)
    flag!: boolean;
  }
}
