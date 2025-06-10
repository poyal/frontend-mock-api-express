import {Injectable}       from '@/core/decorator';
import {PageableModel}    from '@/core/model/pageable.model';
import Mapper             from '@/core/service/mapper.service';
import Container          from '@/core/container';
import {ClassConstructor} from 'class-transformer';

interface SearchParams<T> {
  items: T[];
  number: number;
  size: number;
  type: ClassConstructor<T>;
}

@Injectable()
export class PageableService {
  private mapper: Mapper = Container.resolve(Mapper);

  get<T>({number, size, items, type}: SearchParams<T>): PageableModel.Response.Page<T> {
    const data: T[] = this.mapper.toArray(type, items);
    const page: PageableModel.Response.Page<T> = new PageableModel.Response.Page<T>();
    const totalPages: number = Math.ceil(items.length / size);

    page.content = data.slice((number * size), (number * size) + size);

    page.number = number;
    page.size = size;

    page.numberOfElements = page.content.length;
    page.totalElements = items.length;
    page.totalPages = totalPages;

    page.first = number === 0;
    page.last = number === (totalPages - 1);

    return this.mapper.toPage(type, page);
  }
}
