import {StoreAbstract} from '@/core/store/store.abstract';
import {ErrorService}  from '@/core/service/error.service';

import {DEFAULT}      from '@/app/sample/entity/sample';
import {SampleModel}  from '@/app/sample/model/sample.model';
import {SampleEntity} from '@/app/sample/entity/sample.entity';

class SampleStore extends StoreAbstract<SampleEntity.Sample> {
  constructor() {
    super({
      path      : 'sample/real',
      name      : 'sample.json',
      primaryKey: 'id',
      data      : DEFAULT,
      entity    : SampleEntity.Sample,
    });
  }

  getList(): SampleModel.Response.FindAll[] {
    let items: SampleModel.Response.FindAll[] = this.mapper.toArray(SampleModel.Response.FindAll, super.getAll());
    return this.mapper.toPlain(items);
  }

  getOne(id: number): SampleModel.Response.FindOne {
    const find: SampleEntity.Sample | undefined = super.getOne(id);

    if (!find) {
      throw ErrorService.NotFound();
    }

    const one: SampleModel.Response.FindOne = this.mapper.toObject(SampleModel.Response.FindOne, find);

    return this.mapper.toPlain(one);
  }

  add(item: SampleModel.Request.Add): SampleModel.Response.FindOne {
    const result: SampleModel.Response.FindOne = this.mapper.toObject(SampleModel.Response.FindOne, super.add(item));
    return this.mapper.toPlain(result);
  }

  modify(id: number, item: SampleModel.Request.Modify): SampleModel.Response.FindOne {
    const find: SampleEntity.Sample | undefined = super.getOne(id);

    if (!find) {
      throw ErrorService.NotFound();
    }

    const result: SampleModel.Response.FindOne = this.mapper.toObject(SampleModel.Response.FindOne, super.modify(id, item));
    return this.mapper.toPlain(result);
  }

  delete(id: number) {
    super.delete(id);
  }
}

export const store: SampleStore = new SampleStore();
