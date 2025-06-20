import type {TransformFnParams} from 'class-transformer';
import dayjs from 'dayjs';

import Container from '@/core/container';
import {Injectable} from '@/core/decorator';
import {EnumAbstract} from '@/core/enum/enum.abstract';
import {CheckerService} from '@/core/service/checker.service';

export interface DateFormat {
  toPlain: string | undefined;
  toClass: string | undefined;
}

@Injectable()
export class ReferenceService {
  typeChecker: CheckerService = Container.resolve(CheckerService);

  getDateFormat(target: any, propertyKey: string): DateFormat {
    return {
      toPlain: Reflect.getMetadata('$dateToString', target, propertyKey),
      toClass: Reflect.getMetadata('$stringToDate', target, propertyKey)
    };
  }

  toEnum(value: TransformFnParams, enums: typeof EnumAbstract) {
    const params = value.obj[value.key];

    if (this.typeChecker.isString(params)) {
      return enums.valueOf(params);
    }

    if (this.typeChecker.isArray(params)) {
      const returnArray: any[] = [];
      params.forEach((param: any) => {
        let pushed: any = param;

        if (this.typeChecker.isString(param)) {
          pushed = enums.valueOf(param);
        }

        returnArray.push(pushed);
      });

      return returnArray;
    }

    return params;
  }

  fromEnum(value: TransformFnParams) {
    const params = value.obj[value.key];

    if (this.isEnumInstance(params)) {
      return params.key;
    }

    if (this.typeChecker.isArray(params)) {
      const returnArray: any[] = [];
      params.forEach((param: any) => {
        let pushed: any = param;

        if (this.isEnumInstance(param)) {
          pushed = param.key;
        }

        returnArray.push(pushed);
      });

      return returnArray;
    }

    return params;
  }

  toDateInstance(value: TransformFnParams, format: string | undefined): any {
    const params = value.obj[value.key];

    if (!!params && this.typeChecker.isString(params)) {
      if (!!format) {
        return dayjs(params, format).toDate();
      }

      return dayjs(params).toDate();
    }

    if (this.typeChecker.isArray(params)) {
      const returnArray: any[] = [];
      params.forEach((param: any) => {
        let pushed: any = param;

        if (!!param && this.typeChecker.isString(param)) {
          if (!!format) {
            pushed = dayjs(param, format).toDate();
          }

          pushed = dayjs(param).toDate();
        }

        returnArray.push(pushed);
      });

      return returnArray;
    }

    return params;
  }

  fromStringDate(value: TransformFnParams, format: string | undefined): any {
    const params = value.obj[value.key];

    if (params instanceof Date) {
      if (!!format) {
        return dayjs(params).format(format);
      }

      return dayjs(params).toISOString();
    }

    if (this.typeChecker.isArray(params)) {
      const returnArray: any[] = [];
      params.forEach((param: any) => {
        let pushed: any = param;

        if (param instanceof Date) {
          if (!!format) {
            pushed = dayjs(param).format(format);
          } else {
            pushed = dayjs(param).toISOString();
          }
        }

        returnArray.push(pushed);
      });

      return returnArray;
    }

    return params;
  }

  isEnumInstance(value: any): boolean {
    return !!value && Object.getPrototypeOf(value) instanceof EnumAbstract;
  }
}
