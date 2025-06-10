import {LocalDate, LocalDateTime, LocalTime} from '@js-joda/core';

import {Attribute, XssRequest, XssResponse, Reference, DateFormat}                                                                                    from '@/core/decorator';
import {IsInt, IsNotEmpty, IsString, MaxLength, IsBoolean, IsEnum, IsLocalDate, IsLocalDateTime, IsLocalTime, ValidateNested, IsArray, ArrayNotEmpty} from '@/core/decorator/validator';

import {TypeAEnum} from '@/app/sample/enum/type-a.enum';
import {TypeBEnum} from '@/app/sample/enum/type-b.enum';

export namespace SampleModel {
  export namespace Request {
    export class Add {
      @Attribute('name')
      @XssRequest()
      @IsString() @IsNotEmpty() @MaxLength(200)
      name!: string;

      @Attribute('flag')
      @IsBoolean() @IsNotEmpty()
      flag!: boolean;

      @Attribute('enumA')
      @Reference(() => TypeAEnum)
      @IsNotEmpty() @IsEnum(TypeAEnum)
      enumA!: TypeAEnum;

      @Attribute('enumB')
      @Reference(() => TypeBEnum)
      @IsNotEmpty() @IsEnum(TypeBEnum)
      enumB!: TypeBEnum;

      @Attribute('date')
      @Reference(() => LocalDate)
      @DateFormat('yyyyMMdd')
      @IsNotEmpty() @IsLocalDate()
      date!: LocalDate;

      @Attribute('dateTime')
      @Reference(() => LocalDateTime)
      @DateFormat('yyyy/MM/dd HH:mm:ss')
      @IsNotEmpty() @IsLocalDateTime()
      dateTime!: LocalDateTime;

      @Attribute('time')
      @Reference(() => LocalTime)
      @DateFormat('HH~mm~ss')
      @IsNotEmpty() @IsLocalTime()
      time!: LocalTime;

      @Attribute('item')
      @Reference(() => SampleModel.Request.Item)
      @IsNotEmpty() @ValidateNested()
      item!: SampleModel.Request.Item;

      @Attribute('items')
      @Reference(() => SampleModel.Request.Item)
      @IsArray() @IsNotEmpty() @ArrayNotEmpty() @ValidateNested()
      items!: SampleModel.Request.Item[];
    }

    export class Modify {
      @Attribute('id')
      @IsInt() @IsNotEmpty()
      id!: number;

      @Attribute('name')
      @XssRequest()
      @IsString() @IsNotEmpty() @MaxLength(200)
      name!: string;

      @Attribute('flag')
      @IsBoolean() @IsNotEmpty()
      flag!: boolean;

      @Attribute('enumA')
      @Reference(() => TypeAEnum)
      @IsNotEmpty() @IsEnum(TypeAEnum)
      enumA!: TypeAEnum;

      @Attribute('enumB')
      @Reference(() => TypeBEnum)
      @IsNotEmpty() @IsEnum(TypeBEnum)
      enumB!: TypeBEnum;

      @Attribute('date')
      @Reference(() => LocalDate)
      @DateFormat('yyyyMMdd')
      @IsNotEmpty() @IsLocalDate()
      date!: LocalDate;

      @Attribute('dateTime')
      @Reference(() => LocalDateTime)
      @DateFormat('yyyy/MM/dd HH:mm:ss')
      @IsNotEmpty() @IsLocalDateTime()
      dateTime!: LocalDateTime;

      @Attribute('time')
      @Reference(() => LocalTime)
      @DateFormat('HH~mm~ss')
      @IsNotEmpty() @IsLocalTime()
      time!: LocalTime;

      @Attribute('item')
      @Reference(() => SampleModel.Request.Item)
      @IsNotEmpty() @ValidateNested()
      item!: SampleModel.Request.Item;

      @Attribute('items')
      @Reference(() => SampleModel.Request.Item)
      @IsArray() @IsNotEmpty() @ArrayNotEmpty() @ValidateNested()
      items!: SampleModel.Request.Item[];
    }

    export class Item {
      @Attribute('id')
      @IsInt() @IsNotEmpty()
      id!: number;

      @Attribute('name')
      @XssRequest()
      @IsString() @IsNotEmpty() @MaxLength(200)
      name!: string;

      @Attribute('flag')
      @IsBoolean() @IsNotEmpty()
      flag!: boolean;
    }
  }

  export namespace Response {
    export class FindAll {
      @Attribute('id')
      id!: number;

      @Attribute('name')
      @XssResponse()
      name!: string;

      @Attribute('flag')
      flag!: boolean;

      @Attribute('enumA')
      @Reference(() => TypeAEnum)
      enumA!: TypeAEnum;

      @Attribute('enumB')
      @Reference(() => TypeBEnum)
      enumB!: TypeBEnum;

      @Attribute('date')
      @Reference(() => LocalDate)
      @DateFormat('yyyyMMdd')
      date!: LocalDate;

      @Attribute('dateTime')
      @Reference(() => LocalDateTime)
      @DateFormat('yyyy/MM/dd HH:mm:ss')
      dateTime!: LocalDateTime;

      @Attribute('time')
      @Reference(() => LocalTime)
      @DateFormat('HH~mm~ss')
      time!: LocalTime;

      @Attribute('item')
      @Reference(() => SampleModel.Response.Item)
      item!: SampleModel.Response.Item;

      @Attribute('items')
      @Reference(() => SampleModel.Response.Item)
      items!: SampleModel.Response.Item[];
    }

    export class FindOne {
      @Attribute('id')
      id!: number;

      @Attribute('name')
      @XssResponse()
      name!: string;

      @Attribute('flag')
      flag!: boolean;

      @Attribute('enumA')
      @Reference(() => TypeAEnum)
      enumA!: TypeAEnum;

      @Attribute('enumB')
      @Reference(() => TypeBEnum)
      enumB!: TypeBEnum;

      @Attribute('date')
      @Reference(() => LocalDate)
      @DateFormat('yyyyMMdd')
      date!: LocalDate;

      @Attribute('dateTime')
      @Reference(() => LocalDateTime)
      @DateFormat('yyyy/MM/dd HH:mm:ss')
      dateTime!: LocalDateTime;

      @Attribute('time')
      @Reference(() => LocalTime)
      @DateFormat('HH~mm~ss')
      time!: LocalTime;

      @Attribute('item')
      @Reference(() => SampleModel.Response.Item)
      item!: SampleModel.Response.Item;

      @Attribute('items')
      @Reference(() => SampleModel.Response.Item)
      items!: SampleModel.Response.Item[];
    }

    export class Item {
      @Attribute('id')
      id!: number;

      @Attribute('name')
      @XssResponse()
      name!: string;

      @Attribute('flag')
      flag!: boolean;
    }
  }
}
