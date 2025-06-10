import {Type} from '@decorators/express/lib/src/types';

import FileController from '@/app/file/controller/file.controller';

import AlbumController  from '@/app/album/controller/album.controller';
import UserController   from '@/app/user/controller/user.controller';
import SampleController from '@/app/sample/controller/sample.controller';
import TodoController   from '@/app/todo/controller/todo.controller';

export const Controllers: Type[] = [
  FileController,

  AlbumController,
  UserController,
  SampleController,
  TodoController
];
