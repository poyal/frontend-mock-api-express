import {Attribute, XssRequest, XssResponse, Reference} from '@/core/decorator';
import {IsNotEmpty, IsString, MaxLength, IsOptional, IsEnum, IsBoolean, IsDate} from '@/core/decorator/validator';

import {CategoryTypeEnum} from '@/app/todo/enum/category-type.enum';

export namespace TodoModel {
  export namespace Request {
    export class Search {
      @Attribute('제목')
      title?: string;

      @Attribute('완료여부')
      completeYn?: boolean;

      @Attribute('종류타입')
      @Reference(() => CategoryTypeEnum)
      categoryType?: CategoryTypeEnum;

      constructor({title, completeYn, categoryType}: TodoModel.Request.Search = {}) {
        if (!!title) {
          this.title = title;
        }

        if (!!completeYn) {
          this.completeYn = completeYn;
        }

        if (!!categoryType) {
          this.categoryType = categoryType;
        }
      }
    }

    export class Add {
      @Attribute('타이틀')
      @XssRequest()
      @IsNotEmpty()
      @IsString()
      @MaxLength(100)
      title!: string;

      @Attribute('설명')
      @XssRequest()
      @IsOptional()
      @IsString()
      @MaxLength(500)
      description!: string;

      @Attribute('기한')
      @Reference(() => Date)
      @IsOptional()
      @IsDate()
      endDate!: Date;

      @Attribute('종류타입')
      @Reference(() => CategoryTypeEnum)
      @IsNotEmpty()
      @IsEnum(CategoryTypeEnum)
      categoryType!: CategoryTypeEnum;
    }

    export class Modify {
      @Attribute('타이틀')
      @XssRequest()
      @IsNotEmpty()
      @IsString()
      @MaxLength(100)
      title!: string;

      @Attribute('설명')
      @XssRequest()
      @IsOptional()
      @IsString()
      @MaxLength(500)
      description!: string | undefined;

      @Attribute('기한')
      @Reference(() => Date)
      @IsOptional()
      @IsDate()
      endDate!: Date | undefined;

      @Attribute('종류타입')
      @Reference(() => CategoryTypeEnum)
      @IsNotEmpty()
      @IsEnum(CategoryTypeEnum)
      categoryType!: CategoryTypeEnum;
    }

    export class Complete {
      @Attribute('완료여부')
      @IsNotEmpty()
      @IsBoolean()
      completeYn!: boolean;
    }
  }

  export namespace Response {
    export class FindAll {
      @Attribute('아이디')
      id!: number;

      @Attribute('타이틀')
      @XssResponse()
      title!: string;

      @Attribute('설명')
      @XssResponse()
      description!: string;

      @Attribute('완료여부')
      completeYn!: boolean;

      @Attribute('기한')
      @Reference(() => Date)
      endDate!: Date;

      @Attribute('종류타입')
      @Reference(() => CategoryTypeEnum)
      categoryType!: CategoryTypeEnum;
    }

    export class FindOne {
      @Attribute('아이디')
      id!: number;

      @Attribute('타이틀')
      @XssResponse()
      title!: string;

      @Attribute('설명')
      @XssResponse()
      description!: string;

      @Attribute('완료여부')
      completeYn!: boolean;

      @Attribute('기한')
      @Reference(() => Date)
      endDate!: Date;

      @Attribute('종류타입')
      @Reference(() => CategoryTypeEnum)
      categoryType!: CategoryTypeEnum;
    }
  }
}
