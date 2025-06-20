import type {ClassConstructor} from 'class-transformer';
import dayjs from 'dayjs';
import CustomParseFormat from 'dayjs/plugin/customParseFormat';

// @ts-ignore
import {defaultMetadataStorage} from 'class-transformer/cjs/storage';

import {Injectable} from '@/core/decorator';
import Container from '@/core/container';
import Mapper from '@/core/service/mapper.service';
import {EnumAbstract} from '@/core/enum';

dayjs().locale('ko');
dayjs.extend(CustomParseFormat);

@Injectable()
export class GeneratorService {
  private mapper: Mapper = Container.resolve(Mapper);

  create<T>(classConstructor: ClassConstructor<T>): T {
    return this.setInstance(classConstructor);
  }

  creates<T>(classConstructor: ClassConstructor<T>, size: number = 100): T[] {
    const returnValue: T[] = [];

    for (let index: number = 1; index <= size; index++) {
      returnValue.push(this.setInstance(classConstructor));
    }

    return this.mapper.toPlain(this.mapper.toArray(classConstructor, returnValue));
  }

  private setInstance<T>(classConstructor: ClassConstructor<T>): T {
    const target: T = this.getInstance(classConstructor);
    const keys: string[] = Object.getOwnPropertyNames(target);

    keys.forEach((key: string) => {
      const format: string | undefined = Reflect.getMetadata('$dateToString', target as object, key);
      const description: string | undefined = Reflect.getMetadata('$description', target as object, key);
      const typeFunction: () => any | undefined = Reflect.getMetadata('$column', target as object, key);
      if (!!typeFunction) {
        switch (typeFunction()) {
          case String:
            (target as any)[key] = this.setString(description);
            break;

          case Number:
            (target as any)[key] = this.setNumber();
            break;

          case Boolean:
            (target as any)[key] = this.setBoolean();
            break;

          case Date:
            (target as any)[key] = this.setDate(format);
            break;

          case EnumAbstract:
            (target as any)[key] = this.setEnum(this.getReference(classConstructor, key));
            break;

          case Object:
            (target as any)[key] = this.setInstance(this.getReference(classConstructor, key));
            break;

          case Array:
            (target as any)[key] = [];
            for (let index: number = 0; index < this.setNumber(9) + 1; index++) {
              (target as any)[key].push(this.setInstance(this.getReference(classConstructor, key)));
            }
            break;
        }
      }
    });

    return target;
  }

  private getInstance<T>(classConstructor: ClassConstructor<T>): T {
    return this.mapper.toObject(classConstructor, new classConstructor());
  }

  private setString(prefix: string = '', length: number = 32): string {
    let result: string = '';
    const characters: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength: number = characters.length;

    if (!!prefix) {
      prefix = `${prefix}-`;
    }

    for (let index: number = 0; index < length; index++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return `${prefix}${result}`;
  }

  private setNumber(max: number = 10000): number {
    return Math.floor(Math.random() * max);
  }

  private setBoolean(): boolean {
    return Math.random() < 0.5;
  }

  private getRandomDate(): Date {
    return new Date(+new Date() - Math.floor(Math.random() * 10000000000));
  }

  private setDate(format: string | undefined): string {
    if (!!format) {
      return dayjs(this.getRandomDate()).format(format);
    }

    return dayjs(this.getRandomDate()).toISOString();
  }

  private setEnum(enums: any) {
    return enums.keys[this.setNumber(enums.keys.length)];
  }

  getReference(classConstructor: ClassConstructor<any>, key: string) {
    return defaultMetadataStorage.findTypeMetadata(classConstructor, key).typeFunction();
  }
}
