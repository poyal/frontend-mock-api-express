import {Response}                                                            from 'express';
import {Controller, Get, Query, Params, Post, Body, Put, Delete, Res, Patch} from '@decorators/express';

import Container from '@/core/container';

import {TodoModel} from '@/app/todo/model/todo.model';
import TodoService from '@/app/todo/service/todo.service';

@Controller('/todos')
export default class TodoController {
  private service: TodoService = Container.resolve(TodoService);

  @Get('')
  getList(@Res() res: Response, @Query() query: TodoModel.Request.Search) {
    try {
      res.status(200).json(this.service.getList(query));
    } catch (error: unknown) {
      res.status(406).json(error);
      console.log(error);
    }
  }

  @Get('/:id')
  getOne(@Res() res: Response, @Params('id') id: string) {
    try {
      const one: TodoModel.Response.FindOne = this.service.getOne(Number(id));
      res.status(200).json(one);
    } catch (error: unknown) {
      res.status(406).json(error);
      console.log(error);
    }
  }

  @Post('')
  add(@Res() res: Response, @Body() add: TodoModel.Request.Add) {
    try {
      const result: TodoModel.Response.FindOne = this.service.add(add);
      res.status(200).json(result);
    } catch (error: unknown) {
      res.status(406).json(error);
      console.log(error);
    }
  }

  @Put('/:id')
  modify(@Res() res: Response, @Params('id') id: string, @Body() modify: TodoModel.Request.Modify) {
    try {
      const result: TodoModel.Response.FindOne = this.service.modify(Number(id), modify);
      res.status(200).json(result);
    } catch (error: unknown) {
      res.status(406).json(error);
      console.log(error);
    }
  }

  @Delete('/:id')
  delete(@Res() res: Response, @Params('id') id: string) {
    try {
      this.service.delete(Number(id));
      res.status(200).json();
    } catch (error: unknown) {
      res.status(406).json(error);
      console.log(error);
    }
  }

  @Patch('/:id/complete')
  complete(@Res() res: Response, @Params('id') id: string, @Body() complete: TodoModel.Request.Complete) {
    try {
      const result: TodoModel.Response.FindOne = this.service.complete(Number(id), complete);
      res.status(200).json(result);
    } catch (error: unknown) {
      res.status(406).json(error);
      console.log(error);
    }
  }
}
