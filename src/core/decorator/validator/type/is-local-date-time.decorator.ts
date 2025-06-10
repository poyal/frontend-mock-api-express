import {LocalDateTime}          from '@js-joda/core';
import type {ValidationOptions} from 'class-validator';

import {IsInstanceOfDecorator} from '@/core/decorator/validator';
import {VALIDATE_MESSAGE}      from '@/core/config/validate.config';

export function IsLocalDateTime(validationOptions?: ValidationOptions) {
  validationOptions = Object.assign({
    message: () => VALIDATE_MESSAGE.isLocalDateTime
  }, validationOptions ?? {});

  return IsInstanceOfDecorator(LocalDateTime, {
    decoratorName: 'isLocalDateTime',
    ...validationOptions,
  });
}
