import fs from 'fs';
import dayjs from 'dayjs';
import CustomParseFormat from 'dayjs/plugin/customParseFormat';

import {Injectable} from '@/core/decorator';

import {FileModel} from '@/app/file/model/file.model';

dayjs().locale('ko');
dayjs.extend(CustomParseFormat);

@Injectable()
export class FileService {
  private readonly rootPath: string = '';

  constructor() {
    this.rootPath = `${process.cwd()}/public/upload`;
  }

  add(file: Express.Multer.File): FileModel.Response.FindAll {
    const exts: string[] = file.originalname.split('.');
    const id: string = this.setString();
    const path: string = this.generatePath();
    const name: string = `${id}.${exts.pop()}`;
    const size: number = file.size;

    if (!this.isExistsPath(path)) {
      fs.mkdirSync(`${this.rootPath}/${path}`, {recursive: true});
    }

    fs.writeFileSync(`${this.rootPath}/${path}/${name}`, file.buffer, {});

    const returnValue: FileModel.Response.FindAll = new FileModel.Response.FindAll();

    returnValue.id = id;
    returnValue.path = `${path}/${name}`;
    returnValue.name = Buffer.from(file.originalname, 'latin1').toString('utf8');
    returnValue.size = size;

    return returnValue;
  }

  private isExistsPath(path: string): boolean {
    return fs.existsSync(`${this.rootPath}/${path}`);
  }

  private generatePath(): string {
    return dayjs().format('YYYYMMDD');
  }

  private setString(length: number = 32): string {
    let result: string = '';
    const characters: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength: number = characters.length;

    for (let index: number = 0; index < length; index++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  }
}
