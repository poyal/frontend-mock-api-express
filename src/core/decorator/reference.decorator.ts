import type {TransformFnParams} from 'class-transformer';
import {Transform, Type} from 'class-transformer';
import type {TypeOptions} from 'class-transformer/types/interfaces';

import Container from '@/core/container';
import {EnumAbstract} from '@/core/enum/enum.abstract';
import type {DateFormat} from '@/core/service/reference.service';
import {ReferenceService} from '@/core/service/reference.service';

const referenceService: ReferenceService = Container.resolve(ReferenceService);

export function Reference(typeFunction: any, typeOptions?: TypeOptions) {
  return (target: any, propertyKey: string) => {
    if (!!typeFunction()) {
      switch (typeFunction()) {
        case Date:
          const dateFormat: DateFormat = referenceService.getDateFormat(target, propertyKey);
          Transform((value: TransformFnParams) => referenceService.toDateInstance(value, dateFormat.toClass), {
            toClassOnly: true
          })(target, propertyKey);
          Transform((value: TransformFnParams) => referenceService.fromStringDate(value, dateFormat.toPlain), {
            toPlainOnly: true
          })(target, propertyKey);
          break;

        default:
          switch (Object.getPrototypeOf(typeFunction())) {
            case EnumAbstract:
              Type(typeFunction, typeOptions)(target, propertyKey);
              Transform((value: TransformFnParams) => referenceService.toEnum(value, typeFunction()), {
                toClassOnly: true
              })(target, propertyKey);
              Transform((value: TransformFnParams) => referenceService.fromEnum(value), {toPlainOnly: true})(
                target,
                propertyKey
              );
              break;

            default:
              Type(typeFunction, typeOptions)(target, propertyKey);
              break;
          }
          break;
      }
    } else {
      Type(typeFunction, typeOptions)(target, propertyKey);
    }
  };
}
