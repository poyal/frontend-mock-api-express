import {StoreAbstract} from '@/core/store/store.abstract';
import {PageableModel} from '@/core/model/pageable.model';
import {ErrorService}  from '@/core/service/error.service';

// import json         from '@/app/user/entity/user.json';
import {DEFAULT}    from '@/app/user/entity/user';
import {UserEntity} from '@/app/user/entity/user.entity';
import {UserModel}  from '@/app/user/model/user.model';

class UserStore extends StoreAbstract<UserEntity.User> {
  constructor() {
    super({
      path      : 'user',
      name      : 'user.json',
      primaryKey: 'id',
      // data      : json,
      data  : DEFAULT,
      entity: UserEntity.User,
    });
  }

  getPage(search: UserModel.Request.SearchPage): PageableModel.Response.Page<UserModel.Response.FindAll> {
    return this.mapper.toPlain(super.getPage(search, this.getList(search)));
  }

  getList({name}: UserModel.Request.Search): UserModel.Response.FindAll[] {
    let items: UserModel.Response.FindAll[] = this.mapper.toArray(UserModel.Response.FindAll, super.getAll());

    if (!!name) {
      items = items.filter((param: UserModel.Response.FindAll): boolean => param.name.indexOf(`${name}`) >= 0);
    }

    return this.mapper.toPlain(items);
  }

  getOne(id: number): UserModel.Response.FindOne {
    const find: UserEntity.User | undefined = super.getOne(id);

    if (!find) {
      throw ErrorService.NotFound();
    }

    const one: UserModel.Response.FindOne = this.mapper.toObject(UserModel.Response.FindOne, find);

    return this.mapper.toPlain(one);
  }

  add(item: UserModel.Request.Add): UserModel.Response.FindOne {
    const result: UserModel.Response.FindOne = this.mapper.toObject(UserModel.Response.FindOne, super.add(item));
    return this.mapper.toPlain(result);
  }

  modify(id: number, item: UserModel.Request.Modify): UserModel.Response.FindOne {
    const find: UserEntity.User | undefined = super.getOne(id);

    if (!find) {
      throw ErrorService.NotFound();
    }

    const result: UserModel.Response.FindOne = this.mapper.toObject(UserModel.Response.FindOne, super.modify(id, item));
    return this.mapper.toPlain(result);
  }

  delete(id: number) {
    super.delete(id);
  }
}

export const store: UserStore = new UserStore();
