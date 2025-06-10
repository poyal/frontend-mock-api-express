import type {TransformFnParams}              from 'class-transformer';
import {Transform, Type}                     from 'class-transformer';
import type {TypeOptions}                    from 'class-transformer/types/interfaces';
import {LocalDate, LocalDateTime, LocalTime} from '@js-joda/core';

import Container          from '@/core/container';
import {EnumAbstract}     from '@/core/enum/enum.abstract';
import type {DateFormat}  from '@/core/service/reference.service';
import {ReferenceService} from '@/core/service/reference.service';

const referenceService: ReferenceService = Container.resolve(ReferenceService);

export function Reference(typeFunction: () => any, typeOptions?: TypeOptions) {
  return (target: any, propertyKey: string) => {

    if (!!typeFunction()) {
      switch (typeFunction()) {
        case LocalDate:
          const localDateFormat: DateFormat = referenceService.getDateFormat(target, propertyKey);
          Type(() => typeFunction().now, typeOptions)(target, propertyKey);
          Transform((value: TransformFnParams) => referenceService.toLocalDate(value, localDateFormat.toClass), {toClassOnly: true})(target, propertyKey);
          Transform((value: TransformFnParams) => referenceService.fromStringDate(value, localDateFormat.toPlain), {toPlainOnly: true})(target, propertyKey);
          break;

        case LocalDateTime:
          const localDateTimeFormat: DateFormat = referenceService.getDateFormat(target, propertyKey);
          Type(() => typeFunction().now, typeOptions)(target, propertyKey);
          Transform((value: TransformFnParams) => referenceService.toLocalDateTime(value, localDateTimeFormat.toClass), {toClassOnly: true})(target, propertyKey);
          Transform((value: TransformFnParams) => referenceService.fromStringDate(value, localDateTimeFormat.toPlain), {toPlainOnly: true})(target, propertyKey);
          break;

        case LocalTime:
          const localTimeFormat: DateFormat = referenceService.getDateFormat(target, propertyKey);
          Type(() => typeFunction().now, typeOptions)(target, propertyKey);
          Transform((value: TransformFnParams) => referenceService.toLocalTime(value, localTimeFormat.toClass), {toClassOnly: true})(target, propertyKey);
          Transform((value: TransformFnParams) => referenceService.fromStringDate(value, localTimeFormat.toPlain), {toPlainOnly: true})(target, propertyKey);
          break;

        default:
          switch (Object.getPrototypeOf(typeFunction())) {
            case EnumAbstract:
              Type(typeFunction, typeOptions)(target, propertyKey);
              Transform((value: TransformFnParams) => referenceService.toEnum(value, typeFunction()), {toClassOnly: true})(target, propertyKey);
              Transform((value: TransformFnParams) => referenceService.fromEnum(value), {toPlainOnly: true})(target, propertyKey);
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
