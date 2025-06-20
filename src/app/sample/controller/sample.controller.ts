import {Response} from 'express';
import {Controller, Get, Params, Post, Body, Put, Delete, Res} from '@decorators/express';

import Container from '@/core/container';

import {SampleModel} from '@/app/sample/model/sample.model';
import SampleService from '@/app/sample/service/sample.service';

@Controller('/samples')
export default class SampleController {
  private service: SampleService = Container.resolve(SampleService);

  @Get('')
  getList(@Res() res: Response) {
    try {
      res.status(200).json(this.service.getList());
    } catch (error: unknown) {
      res.status(406).json(error);
      console.error(error);
    }
  }

  @Get('/:id')
  getOne(@Res() res: Response, @Params('id') id: string) {
    try {
      const one: SampleModel.Response.FindOne = this.service.getOne(Number(id));
      res.status(200).json(one);
    } catch (error: unknown) {
      res.status(406).json(error);
      console.error(error);
    }
  }

  @Post('')
  add(@Res() res: Response, @Body() add: SampleModel.Request.Add) {
    try {
      const result: SampleModel.Response.FindOne = this.service.add(add);
      res.status(200).json(result);
    } catch (error: unknown) {
      res.status(406).json(error);
      console.error(error);
    }
  }

  @Put('/:id')
  modify(@Res() res: Response, @Params('id') id: string, @Body() modify: SampleModel.Request.Modify) {
    try {
      const result: SampleModel.Response.FindOne = this.service.modify(Number(id), modify);
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
