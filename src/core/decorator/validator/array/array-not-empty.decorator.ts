import type {ValidationOptions}                       from 'class-validator';
import {ArrayNotEmpty as ClassValidatorArrayNotEmpty} from 'class-validator';

import {VALIDATE_MESSAGE} from '@/core/config/validate.config';

export function ArrayNotEmpty(validationOptions?: ValidationOptions) {
  return (target: any, propertyKey: string) => {
    validationOptions = Object.assign({
      message: () => VALIDATE_MESSAGE.arrayNotEmpty
    }, validationOptions ?? {});

    ClassValidatorArrayNotEmpty(validationOptions)(target, propertyKey);
  };
}
