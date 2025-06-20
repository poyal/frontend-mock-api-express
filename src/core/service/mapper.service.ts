import {ClassConstructor, instanceToPlain, plainToInstance} from 'class-transformer';

import {Injectable} from '@/core/decorator';
import {PageableModel} from '@/core/model/pageable.model';

@Injectable()
export default class Mapper {
  toObject<T>(type: ClassConstructor<T>, source: T): T {
    return plainToInstance(type, source, {excludeExtraneousValues: true, exposeDefaultValues: true});
  }

  toArray<T>(type: ClassConstructor<T>, source: T[]): T[] {
    return plainToInstance(type, source, {excludeExtraneousValues: true, exposeDefaultValues: true});
  }

  toPage<T>(type: ClassConstructor<T>, source: PageableModel.Response.Page<T>): PageableModel.Response.Page<T> {
    const page: PageableModel.Response.Page<T> = plainToInstance(PageableModel.Response.Page, source, {
      excludeExtraneousValues: true
    }) as PageableModel.Response.Page<T>;
    page.content = plainToInstance(type, source.content, {excludeExtraneousValues: true}) as T[];
    return page;
  }

  toPlain<T>(source: T): T {
    return instanceToPlain(source) as T;
  }
}
