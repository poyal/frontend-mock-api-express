import type {ValidationOptions}   from 'class-validator';
import {Min as ClassValidatorMin} from 'class-validator';

import {VALIDATE_MESSAGE} from '@/core/config/validate.config';

export function Min(minValue: number, validationOptions?: ValidationOptions) {
  return (target: any, propertyKey: string) => {
    validationOptions = Object.assign({
      message: () => VALIDATE_MESSAGE.min
    }, validationOptions ?? {});

    ClassValidatorMin(minValue, validationOptions)(target, propertyKey);
  };
}
