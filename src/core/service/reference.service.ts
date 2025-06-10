import type {TransformFnParams}                                 from 'class-transformer';
import {DateTimeFormatter, LocalDate, LocalDateTime, LocalTime} from '@js-joda/core';

import Container        from '@/core/container';
import {Injectable}     from '@/core/decorator';
import {EnumAbstract}   from '@/core/enum/enum.abstract';
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


  toLocalDate(value: TransformFnParams, format: string | undefined): any {
    const params = value.obj[value.key];

    if (!!params && this.typeChecker.isString(params)) {
      if (!!format) {
        return LocalDate.parse(params, DateTimeFormatter.ofPattern(format));
      }

      return LocalDate.parse(params, DateTimeFormatter.ISO_LOCAL_DATE);
    }

    if (this.typeChecker.isArray(params)) {
      const returnArray: any[] = [];
      params.forEach((param: any) => {
        let pushed: any = param;

        if (!!param && this.typeChecker.isString(param)) {
          if (!!format) {
            pushed = LocalDate.parse(param, DateTimeFormatter.ofPattern(format));
          }

          pushed = LocalDate.parse(param, DateTimeFormatter.ISO_LOCAL_DATE);
        }

        returnArray.push(pushed);
      });

      return returnArray;
    }

    return params;
  }

  toLocalDateTime(value: TransformFnParams, format: string | undefined): any {
    const params = value.obj[value.key];

    if (!!params && this.typeChecker.isString(params)) {
      if (!!format) {
        return LocalDateTime.parse(params, DateTimeFormatter.ofPattern(format));
      }

      return LocalDateTime.parse(params, DateTimeFormatter.ISO_LOCAL_DATE_TIME);
    }

    if (this.typeChecker.isArray(params)) {
      const returnArray: any[] = [];
      params.forEach((param: any) => {
        let pushed: any = param;

        if (!!param && this.typeChecker.isString(param)) {
          if (!!format) {
            pushed = LocalDateTime.parse(param, DateTimeFormatter.ofPattern(format));
          }

          pushed = LocalDateTime.parse(param, DateTimeFormatter.ISO_LOCAL_DATE_TIME);
        }

        returnArray.push(pushed);
      });

      return returnArray;
    }

    return params;
  }

  toLocalTime(value: TransformFnParams, format: string | undefined): any {
    const params = value.obj[value.key];

    if (!!params && this.typeChecker.isString(params)) {
      if (!!format) {
        return LocalTime.parse(params, DateTimeFormatter.ofPattern(format));
      }

      return LocalTime.parse(params, DateTimeFormatter.ISO_LOCAL_TIME);
    }

    if (this.typeChecker.isArray(params)) {
      const returnArray: any[] = [];
      params.forEach((param: any) => {
        let pushed: any = param;

        if (!!param && this.typeChecker.isString(param)) {
          if (!!format) {
            pushed = LocalTime.parse(param, DateTimeFormatter.ofPattern(format));
          }

          pushed = LocalTime.parse(param);
        }

        returnArray.push(pushed);
      });

      return returnArray;
    }

    return params;
  }

  fromStringDate(value: TransformFnParams, format: string | undefined): any {
    const params = value.obj[value.key];

    if (params instanceof LocalDateTime) {
      if (!!format) {
        return params.format(DateTimeFormatter.ofPattern(format));
      }

      return params.format(DateTimeFormatter.ISO_LOCAL_DATE_TIME);
    }

    if (params instanceof LocalDate) {
      if (!!format) {
        return params.format(DateTimeFormatter.ofPattern(format));
      }

      return params.format(DateTimeFormatter.ISO_LOCAL_DATE);
    }

    if (params instanceof LocalTime) {
      if (!!format) {
        return params.format(DateTimeFormatter.ofPattern(format));
      }

      return params.format(DateTimeFormatter.ISO_LOCAL_TIME);
    }

    if (this.typeChecker.isArray(params)) {
      const returnArray: any[] = [];
      params.forEach((param: any) => {
        let pushed: any = param;

        if (param instanceof LocalDateTime) {
          if (!!format) {
            pushed = param.format(DateTimeFormatter.ofPattern(format));
          } else {
            pushed = param.format(DateTimeFormatter.ISO_LOCAL_DATE_TIME);
          }
        }

        if (param instanceof LocalDate) {
          if (!!format) {
            pushed = param.format(DateTimeFormatter.ofPattern(format));
          } else {
            pushed = param.format(DateTimeFormatter.ISO_LOCAL_DATE);
          }
        }

        if (param instanceof LocalTime) {
          if (!!format) {
            pushed = param.format(DateTimeFormatter.ofPattern(format));
          } else {
            pushed = param.format(DateTimeFormatter.ISO_LOCAL_TIME);
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
