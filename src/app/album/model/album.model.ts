import {Attribute, XssRequest, XssResponse}               from '@/core/decorator';
import {IsInt, IsNotEmpty, IsNumber, IsString, MaxLength} from '@/core/decorator/validator';
import {PageableModel}                                    from '@/core/model/pageable.model';

export namespace AlbumModel {
  export namespace Request {
    export class Search {
      @Attribute('타이틀')
      title?: string;

      constructor({title}: AlbumModel.Request.Search = {}) {
        if (!!title) {
          this.title = title;
        }
      }
    }

    export class SearchPage extends PageableModel.Request.Search {
      @Attribute('타이틀')
      title?: string;

      constructor(search: AlbumModel.Request.SearchPage = {}) {
        super(search);

        if (!!search.title) {
          this.title = search.title;
        }
      }
    }

    export class Add {
      @Attribute('타이틀')
      @XssRequest()
      @IsString() @IsNotEmpty() @MaxLength(200)
      title!: string;

      @Attribute('유저 아이디')
      @IsNumber() @IsNotEmpty()
      userId!: number;
    }

    export class Modify {
      @Attribute('아이디')
      @IsInt() @IsNotEmpty()
      id!: number;

      @Attribute('타이틀')
      @XssRequest()
      @IsString() @IsNotEmpty() @MaxLength(200)
      title!: string;

      @Attribute('유저 아이디')
      @IsNumber() @IsNotEmpty()
      userId!: number;
    }
  }

  export namespace Response {
    export class FindAll {
      @Attribute('아이디')
      id!: number;

      @Attribute('타이틀')
      @XssResponse()
      title!: string;

      @Attribute('유저 아이디')
      userId!: number;
    }

    export class FindOne {
      @Attribute('아이디')
      id!: number;

      @Attribute('타이틀')
      @XssResponse()
      title!: string;

      @Attribute('유저 아이디')
      userId!: number;
    }
  }
}
