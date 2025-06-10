import {Injectable}      from '@/core/decorator';
import Container         from '@/core/container';
import Mapper            from '@/core/service/mapper.service';
import {ValidateService} from '@/core/service/validate.service';

import {store}       from '@/app/sample/store/sample.store';
import {SampleModel} from '@/app/sample/model/sample.model';

@Injectable()
export default class SampleService {
  private validate: ValidateService = Container.resolve(ValidateService);
  private mapper: Mapper = Container.resolve(Mapper);

  getList(): SampleModel.Response.FindAll[] {
    return store.getList();
  }

  getOne(id: number): SampleModel.Response.FindOne {
    return store.getOne(id);
  }

  add(item: SampleModel.Request.Add): SampleModel.Response.FindOne {
    this.validate.check(this.mapper.toObject(SampleModel.Request.Add, item));
    return store.add(item);
  }

  modify(id: number, item: SampleModel.Request.Modify): SampleModel.Response.FindOne {
    this.validate.check(this.mapper.toObject(SampleModel.Request.Modify, item));
    return store.modify(id, item);
  }

  delete(id: number) {
    store.delete(id);
  }
}
