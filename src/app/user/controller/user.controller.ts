import {Response} from 'express';
import {Controller, Get, Query, Params, Post, Body, Put, Delete, Res} from '@decorators/express';

import Container from '@/core/container';

import {UserModel} from '@/app/user/model/user.model';
import UserService from '@/app/user/service/user.service';
import Mapper from '@/core/service/mapper.service';

@Controller('/users')
export default class UserController {
  private service: UserService = Container.resolve(UserService);
  private mapper: Mapper = Container.resolve(Mapper);

  @Get('')
  getList(@Res() res: Response, @Query() query: UserModel.Request.Search) {
    try {
      res.status(200).json(this.service.getList(query));
    } catch (error: unknown) {
      res.status(406).json(error);
      console.error(error);
    }
  }

  @Get('/page')
  getPage(@Res() res: Response, @Query() query: UserModel.Request.SearchPage) {
    try {
      res.status(200).json(this.service.getPage(query));
    } catch (error: unknown) {
      res.status(406).json(error);
      console.error(error);
    }
  }

  @Get('/:id')
  getOne(@Res() res: Response, @Params('id') id: string) {
    try {
      const one: UserModel.Response.FindOne = this.service.getOne(Number(id));
      res.status(200).json(one);
    } catch (error: unknown) {
      res.status(406).json(error);
      console.error(error);
    }
  }

  @Post('')
  add(@Res() res: Response, @Body() add: UserModel.Request.Add) {
    try {
      const result: UserModel.Response.FindOne = this.service.add(add);
      res.status(200).json(result);
    } catch (error: unknown) {
      res.status(406).json(error);
      console.error(error);
    }
  }

  @Put('/:id')
  modify(@Res() res: Response, @Params('id') id: string, @Body() modify: UserModel.Request.Modify) {
    try {
      const result: UserModel.Response.FindOne = this.service.modify(Number(id), modify);
      res.status(200).json(result);
    } catch (error: unknown) {
      res.status(406).json(error);
      console.error(error);
    }
  }

  @Delete('/:id')
  delete(@Res() res: Response, @Params('id') id: string) {
    try {
      this.service.delete(Number(id));
      res.status(200).json();
    } catch (error: unknown) {
      res.status(406).json(error);
      console.error(error);
    }
  }
}
