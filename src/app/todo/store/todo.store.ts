import Container        from '@/core/container';
import {StoreAbstract}  from '@/core/store/store.abstract';
import {ErrorService}   from '@/core/service/error.service';
import {CheckerService} from '@/core/service/checker.service';

import json         from '@/app/todo/entity/todo.json';
import {TodoEntity} from '@/app/todo/entity/todo.entity';
import {TodoModel}  from '@/app/todo/model/todo.model';

class TodoStore extends StoreAbstract<TodoEntity.Todo> {
  private checkerService: CheckerService = Container.resolve(CheckerService);

  constructor() {
    super({
      path      : 'todo',
      name      : 'todo.json',
      primaryKey: 'id',
      // @ts-ignore
      data  : json,
      entity: TodoEntity.Todo,
    });
  }

  getList({title, completeYn, categoryType}: TodoModel.Request.Search): TodoModel.Response.FindAll[] {
    let items: TodoModel.Response.FindAll[] = this.mapper.toArray(TodoModel.Response.FindAll, super.getAll());

    if (!!title) {
      items = items.filter((param: TodoModel.Response.FindAll): boolean => param.title.indexOf(`${title}`) >= 0);
    }

    if (this.checkerService.getBoolean(`${completeYn}`) !== undefined) {
      items = items.filter((param: TodoModel.Response.FindAll): boolean => param.completeYn === this.checkerService.getBoolean(`${completeYn}`));
    }

    if (!!categoryType) {
      items = items.filter((param: TodoModel.Response.FindAll): boolean => param.categoryType.equal(categoryType.toString()));
    }

    return this.mapper.toPlain(items);
  }

  getOne(id: number): TodoModel.Response.FindOne {
    const find: TodoEntity.Todo | undefined = super.getOne(id);

    if (!find) {
      throw ErrorService.NotFound();
    }

    const one: TodoModel.Response.FindOne = this.mapper.toObject(TodoModel.Response.FindOne, find);

    return this.mapper.toPlain(one);
  }

  add(item: TodoModel.Request.Add): TodoModel.Response.FindOne {
    const add: TodoEntity.Todo = this.mapper.toObject(TodoEntity.Todo, item as TodoEntity.Todo);
    add.completeYn = false;

    const result: TodoModel.Response.FindOne = this.mapper.toObject(TodoModel.Response.FindOne, super.add(add));
    return this.mapper.toPlain(result);
  }

  modify(id: number, item: TodoModel.Request.Modify): TodoModel.Response.FindOne {
    const find: TodoEntity.Todo | undefined = super.getOne(id);

    if (!find) {
      throw ErrorService.NotFound();
    }

    const modify: TodoEntity.Todo = this.mapper.toObject(TodoEntity.Todo, item as TodoEntity.Todo);
    modify.completeYn = find.completeYn;

    const result: TodoModel.Response.FindOne = this.mapper.toObject(TodoModel.Response.FindOne, super.modify(id, modify));
    return this.mapper.toPlain(result);
  }

  delete(id: number) {
    super.delete(id);
  }

  complete(id: number, item: TodoModel.Request.Complete): TodoModel.Response.FindOne {
    const find: TodoEntity.Todo | undefined = super.getOne(id);

    if (!find) {
      throw ErrorService.NotFound();
    }

    find.completeYn = this.checkerService.getBoolean(`${item.completeYn}`) ?? false;

    const result: TodoModel.Response.FindOne = this.mapper.toObject(TodoModel.Response.FindOne, super.modify(id, find));
    return this.mapper.toPlain(result);
  }
}

export const store: TodoStore = new TodoStore();
