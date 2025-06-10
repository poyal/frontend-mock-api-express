import {LocalDate}              from '@js-joda/core';
import type {ValidationOptions} from 'class-validator';

import {IsInstanceOfDecorator} from '@/core/decorator/validator';
import {VALIDATE_MESSAGE}      from '@/core/config/validate.config';

export function IsLocalDate(validationOptions?: ValidationOptions) {
  validationOptions = Object.assign({
    message: () => VALIDATE_MESSAGE.isLocalDate
  }, validationOptions ?? {});

  return IsInstanceOfDecorator(LocalDate, {
    decoratorName: 'isLocalDate',
    ...validationOptions,
  });
}
