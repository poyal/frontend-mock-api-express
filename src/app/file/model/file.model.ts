import {Attribute} from '@/core/decorator';

export namespace FileModel {
  export namespace Response {
    export class FindAll {
      @Attribute('아이디')
      id!: string;

      @Attribute('파일경로')
      path!: string;

      @Attribute('파일명')
      name!: string;
    }
  }
}
