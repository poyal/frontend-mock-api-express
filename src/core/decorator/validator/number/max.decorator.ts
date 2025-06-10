import type {ValidationOptions}   from 'class-validator';
import {Max as ClassValidatorMax} from 'class-validator';

import {VALIDATE_MESSAGE} from '@/core/config/validate.config';

export function Max(maxValue: number, validationOptions?: ValidationOptions) {
  return (target: any, propertyKey: string) => {
    validationOptions = Object.assign({
      message: () => VALIDATE_MESSAGE.max
    }, validationOptions ?? {});

    ClassValidatorMax(maxValue, validationOptions)(target, propertyKey);
  };
}
