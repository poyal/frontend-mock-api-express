import {ClassConstructor} from 'class-transformer';

import Container         from '@/core/container';
import {PageableModel}   from '@/core/model/pageable.model';
import Mapper            from '@/core/service/mapper.service';
import {StateService}    from '@/core/service/state.service';
import {PageableService} from '@/core/service/pageable.service';

interface StoreConstructor<T> {
  path?: string;
  name?: string;
  data?: T[];
  entity: ClassConstructor<T>;
  primaryKey: string;
}

export abstract class StoreAbstract<T> {
  mapper: Mapper = Container.resolve(Mapper);
  private stateService: StateService = Container.resolve(StateService);
  private pageable: PageableService = Container.resolve(PageableService);

  state: T[] = [];

  private readonly path?: string;
  private readonly name?: string;
  private readonly data?: T[];
  private readonly entity!: ClassConstructor<T>;
  private readonly primaryKey!: string;

  protected constructor({path, name, data, entity, primaryKey}: StoreConstructor<T>) {
    this.entity = entity;
    this.primaryKey = primaryKey;

    if (!!path && !!name) {
      this.path = path;
      this.name = name;
    }

    if (!!data) {
      this.data = data;
    }

    this.initialize({path, name, data});
  }

  getPage(search: PageableModel.Request.Search, items: T[]): PageableModel.Response.Page<T> {
    return this.pageable.get({
      items : items,
      type  : this.entity,
      size  : Number(search.size ?? 10),
      number: Number(search.page ?? 0)
    });
  }

  getAll(): T[] {
    return this.mapper.toArray(this.entity, this.state);
  }

  getOne(id: any): T | undefined {
    const one: T | undefined = this.state.find((param: any): boolean => param[this.primaryKey] === id);

    if (!!one) {
      return this.mapper.toObject(this.entity, one);
    }

    return undefined;
  }

  add(item: any): T {
    const add: any = this.mapper.toPlain(item);

    if (!!this.state && this.state.length > 0) {
      add[this.primaryKey] = this.setPrimaryKey();
    } else {
      add[this.primaryKey] = 1;
    }

    this.state.push(add);

    this.write();

    return this.mapper.toObject(this.entity, add);
  }

  modify(id: any, item: any): T {
    const findIndex: number = this.state.findIndex((param: any): boolean => param[this.primaryKey] === id);
    const modify: any = this.mapper.toPlain(item);

    modify.id = id;
    this.state[findIndex] = modify;

    this.write();

    return this.mapper.toObject(this.entity, modify);
  }

  delete(id: any) {
    this.state = this.state.filter((param: any): boolean => param[this.primaryKey] !== id);

    this.write();
  }

  write() {
    if (!!this.path && !!this.name) {
      this.stateService.write({
        path: this.path,
        name: this.name,
        data: this.mapper.toPlain(this.mapper.toArray(this.entity, this.state))
      });

      this.state = this.mapper.toPlain(this.mapper.toArray(this.entity, this.stateService.read({path: this.path, name: this.name})));
    }
  }

  private initialize({path, name, data}: { path?: string; name?: string; data?: T[]; }) {
    if (!!path && !!name) {
      if (!!data && data?.length > 0) {
        const origin: T[] = this.stateService.read({path, name});

        if (origin?.length === 0) {
          this.stateService.write({path, name, data});
        }
      }

      this.state = this.stateService.read({path, name});
    }
  }

  private setPrimaryKey(): number {
    let primaryKey: number | null = null;
    let items: T[] = this.mapper.toArray(this.entity, this.state);
    items = items.sort((compareA: any, compareB: any) => compareA[this.primaryKey] - compareB[this.primaryKey]);

    const item: any | undefined = items.pop();

    if (!!item) {
      primaryKey = item[this.primaryKey] + 1;
    }

    if (primaryKey === null) {
      throw new Error('NOT_FOUND');
    }

    return primaryKey;
  }
}
