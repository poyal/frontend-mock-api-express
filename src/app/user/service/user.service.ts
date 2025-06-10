import {Injectable}      from '@/core/decorator';
import Container         from '@/core/container';
import Mapper            from '@/core/service/mapper.service';
import {ValidateService} from '@/core/service/validate.service';

import {PageableModel} from '@/core/model/pageable.model';
import {UserModel}     from '@/app/user/model/user.model';
import {store}         from '@/app/user/store/user.store';

@Injectable()
export default class UserService {
  private validate: ValidateService = Container.resolve(ValidateService);
  private mapper: Mapper = Container.resolve(Mapper);

  getPage(search: UserModel.Request.SearchPage): PageableModel.Response.Page<UserModel.Response.FindAll> {
    return store.getPage(search);
  }

  getList(search: UserModel.Request.Search): UserModel.Response.FindAll[] {
    return store.getList(search);
  }

  getOne(id: number): UserModel.Response.FindOne {
    return store.getOne(id);
  }

  add(item: UserModel.Request.Add): UserModel.Response.FindOne {
    this.validate.check(this.mapper.toObject(UserModel.Request.Add, item));
    return store.add(item);
  }

  modify(id: number, item: UserModel.Request.Modify): UserModel.Response.FindOne {
    this.validate.check(this.mapper.toObject(UserModel.Request.Add, item));
    return store.modify(id, item);
  }

  delete(id: number) {
    store.delete(id);
  }
}
