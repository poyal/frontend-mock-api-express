import {Injectable}      from '@/core/decorator';
import Container         from '@/core/container';
import Mapper            from '@/core/service/mapper.service';
import {ValidateService} from '@/core/service/validate.service';

import {PageableModel} from '@/core/model/pageable.model';
import {AlbumModel}    from '@/app/album/model/album.model';
import {store}         from '@/app/album/store/album.store';

@Injectable()
export default class AlbumService {
  private validate: ValidateService = Container.resolve(ValidateService);
  private mapper: Mapper = Container.resolve(Mapper);

  getPage(search: AlbumModel.Request.SearchPage): PageableModel.Response.Page<AlbumModel.Response.FindAll> {
    return store.getPage(search);
  }

  getList(search: AlbumModel.Request.Search): AlbumModel.Response.FindAll[] {
    return store.getList(search);
  }

  getOne(id: number): AlbumModel.Response.FindOne {
    return store.getOne(id);
  }

  add(item: AlbumModel.Request.Add): AlbumModel.Response.FindOne {
    this.validate.check(this.mapper.toObject(AlbumModel.Request.Add, item));
    return store.add(item);
  }

  modify(id: number, item: AlbumModel.Request.Modify): AlbumModel.Response.FindOne {
    this.validate.check(this.mapper.toObject(AlbumModel.Request.Modify, item));
    return store.modify(id, item);
  }

  delete(id: number) {
    store.delete(id);
  }
}
