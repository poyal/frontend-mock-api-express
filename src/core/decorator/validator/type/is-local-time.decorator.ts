import {LocalTime}              from '@js-joda/core';
import type {ValidationOptions} from 'class-validator';

import {IsInstanceOfDecorator} from '@/core/decorator/validator';
import {VALIDATE_MESSAGE}      from '@/core/config/validate.config';


export function IsLocalTime(validationOptions?: ValidationOptions) {
  validationOptions = Object.assign({
    message: () => VALIDATE_MESSAGE.isLocalTime
  }, validationOptions ?? {});

  return IsInstanceOfDecorator(LocalTime, {
    decoratorName: 'isLocalTime',
    ...validationOptions,
  });
}
