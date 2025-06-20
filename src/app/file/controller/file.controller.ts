import {Request, Response} from 'express';
import multer from 'multer';
import {Controller, Res, Post, Req} from '@decorators/express';

import Container from '@/core/container';

import {FileModel} from '@/app/file/model/file.model';
import {FileService} from '@/app/file/service/file.service';

const upload: multer.Multer = multer();

@Controller('/api/images')
export default class FileController {
  private service: FileService = Container.resolve(FileService);

  @Post('', [upload.single('file')])
  add(@Res() res: Response, @Req() req: Request) {
    try {
      const result: FileModel.Response.FindAll = this.service.add(req.file as Express.Multer.File);
      res.status(200).json(result);
    } catch (error: unknown) {
      res.status(406).json(error);
      console.error(error);
    }
  }
}
