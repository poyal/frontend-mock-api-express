import {Injectable} from '@/core/decorator';

@Injectable()
export class CheckerService {
  isString(value: any): boolean {
    return value instanceof String || typeof value === 'string';
  }

  isNumber(value: any): boolean {
    return typeof value === 'number' && Number.isInteger(value);
  }

  isBoolean(value: any): boolean {
    return value instanceof Boolean || typeof value === 'boolean';
  }

  isDate(value: any): boolean {
    return value instanceof Date && !isNaN(value.getTime());
  }

  isObject(value: any): boolean {
    return value != null && (typeof value === 'object' || typeof value === 'function') && !Array.isArray(value);
  }

  isArray(value: any): boolean {
    return Array.isArray(value);
  }

  getBoolean(boolean: string): boolean | undefined {
    let returnValue: boolean | undefined = undefined;

    if (boolean === 'true') {
      returnValue = true;
    } else if (boolean === 'false') {
      returnValue = false;
    }

    return returnValue;
  }
}
