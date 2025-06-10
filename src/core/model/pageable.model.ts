import {Attribute, Reference} from '@/core/decorator';

import {DEFAULT_SIZE_TEN, DEFAULT_PAGE_SORT} from '@/core/config/pageable.config';


export namespace PageableModel {
  export namespace Request {
    export class Search {
      @Attribute('page')
      page?: number = 0;

      @Attribute('size')
      size?: number;

      @Attribute('sort')
      sort?: string;

      constructor(options?: PageableModel.Request.Options) {
        this.size = DEFAULT_SIZE_TEN;
        this.sort = DEFAULT_PAGE_SORT;

        if (!!options) {
          if (options.size !== null && options.size !== undefined) {
            this.size = options.size;
          }

          if (options.sort !== null && options.sort !== undefined) {
            this.sort = options.sort;
          }
        }
      }
    }

    export class Options {
      @Attribute('size')
      size?: number;

      @Attribute('sort')
      sort?: string;
    }
  }

  export namespace Response {
    export class Page<T> {
      @Attribute('first')
      first!: boolean;

      @Attribute('last')
      last!: boolean;

      @Attribute('number')
      number!: number;

      @Attribute('numberOfElements')
      numberOfElements!: number;

      @Attribute('size')
      size!: number;

      @Attribute('totalElements')
      totalElements!: number;

      @Attribute('totalPages')
      totalPages!: number;

      @Attribute('pageable')
      @Reference(() => PageableModel.Response.PageableInfo)
      pageable!: PageableModel.Response.PageableInfo;

      @Attribute('sort')
      @Reference(() => PageableModel.Response.Sort)
      sort!: PageableModel.Response.Sort;

      @Attribute('목록')
      content!: T[];
    }

    export class PageableInfo {
      @Attribute('offset')
      offset!: number;

      @Attribute('pageNumber')
      pageNumber!: number;

      @Attribute('pageSize')
      pageSize!: number;

      @Attribute('paged')
      paged!: boolean;

      @Attribute('unpaged')
      unpaged!: boolean;

      @Attribute('sort')
      @Reference(() => PageableModel.Response.Sort)
      sort!: PageableModel.Response.Sort;
    }

    export class Sort {
      @Attribute('sorted')
      sorted!: boolean;

      @Attribute('unsorted')
      unsorted!: boolean;
    }
  }
}
