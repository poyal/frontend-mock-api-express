import {StoreAbstract} from '@/core/store/store.abstract';
import {PageableModel} from '@/core/model/pageable.model';
import {ErrorService}  from '@/core/service/error.service';

import json          from '@/app/album/entity/album.json';
import {AlbumEntity} from '@/app/album/entity/album.entity';
import {AlbumModel}  from '@/app/album/model/album.model';

class AlbumStore extends StoreAbstract<AlbumEntity.Album> {
  constructor() {
    super({
      path      : 'album',
      name      : 'album.json',
      primaryKey: 'id',
      data      : json,
      entity    : AlbumEntity.Album,
    });
  }

  getPage(search: AlbumModel.Request.SearchPage): PageableModel.Response.Page<AlbumModel.Response.FindAll> {
    return this.mapper.toPlain(super.getPage(search, this.getList(search)));
  }

  getList({title}: AlbumModel.Request.Search): AlbumModel.Response.FindAll[] {
    let items: AlbumModel.Response.FindAll[] = this.mapper.toArray(AlbumModel.Response.FindAll, super.getAll());

    if (!!title) {
      items = items.filter((param: AlbumModel.Response.FindAll): boolean => param.title.indexOf(`${title}`) >= 0);
    }

    return this.mapper.toPlain(items);
  }

  getOne(id: number): AlbumModel.Response.FindOne {
    const find: AlbumEntity.Album | undefined = super.getOne(id);

    if (!find) {
      throw ErrorService.NotFound();
    }

    const one: AlbumModel.Response.FindOne = this.mapper.toObject(AlbumModel.Response.FindOne, find);

    return this.mapper.toPlain(one);
  }

  add(item: AlbumModel.Request.Add): AlbumModel.Response.FindOne {
    const result: AlbumModel.Response.FindOne = this.mapper.toObject(AlbumModel.Response.FindOne, super.add(item));
    return this.mapper.toPlain(result);
  }

  modify(id: number, item: AlbumModel.Request.Modify): AlbumModel.Response.FindOne {
    const find: AlbumEntity.Album | undefined = super.getOne(id);

    if (!find) {
      throw ErrorService.NotFound();
    }

    const result: AlbumModel.Response.FindOne = this.mapper.toObject(AlbumModel.Response.FindOne, super.modify(id, item));
    return this.mapper.toPlain(result);
  }

  delete(id: number) {
    super.delete(id);
  }
}

export const store: AlbumStore = new AlbumStore();
