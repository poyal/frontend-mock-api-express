import {Column, Attribute} from '@/core/decorator';

export namespace AlbumEntity {
  export class Album {
    @Attribute('id')
    @Column(() => Number)
    id!: number;

    @Attribute('title')
    @Column(() => String)
    title!: string;

    @Attribute('userId')
    @Column(() => Number)
    userId!: number;
  }
}

