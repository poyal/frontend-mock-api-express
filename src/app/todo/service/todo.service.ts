import {Injectable}      from '@/core/decorator';
import Container         from '@/core/container';
import Mapper            from '@/core/service/mapper.service';
import {ValidateService} from '@/core/service/validate.service';

import {TodoModel} from '@/app/todo/model/todo.model';
import {store}     from '@/app/todo/store/todo.store';

@Injectable()
export default class TodoService {
  private validate: ValidateService = Container.resolve(ValidateService);
  private mapper: Mapper = Container.resolve(Mapper);

  getList(search: TodoModel.Request.Search): TodoModel.Response.FindAll[] {
    return store.getList(search);
  }

  getOne(id: number): TodoModel.Response.FindOne {
    return store.getOne(id);
  }

  add(item: TodoModel.Request.Add): TodoModel.Response.FindOne {
    this.validate.check(this.mapper.toObject(TodoModel.Request.Add, item));
    return store.add(item);
  }

  modify(id: number, item: TodoModel.Request.Modify): TodoModel.Response.FindOne {
    if (!item.endDate) {
      item.endDate = undefined;
    }

    if (!item.description) {
      item.description = undefined;
    }

    this.validate.check(this.mapper.toObject(TodoModel.Request.Modify, item));
    return store.modify(id, item);
  }

  delete(id: number) {
    store.delete(id);
  }

  complete(id: number, item: TodoModel.Request.Complete): TodoModel.Response.FindOne {
    this.validate.check(this.mapper.toObject(TodoModel.Request.Complete, item));
    return store.complete(id, item);
  }
}
