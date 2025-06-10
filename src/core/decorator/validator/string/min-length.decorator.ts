import type {ValidationOptions}               from 'class-validator';
import {MinLength as ClassValidatorMinLength} from 'class-validator';

import {VALIDATE_MESSAGE} from '@/core/config/validate.config';

export function MinLength(minValue: number, validationOptions?: ValidationOptions) {
  return (target: any, propertyKey: string) => {
    validationOptions = Object.assign({
      message: () => VALIDATE_MESSAGE.minLength
    }, validationOptions ?? {});

    ClassValidatorMinLength(minValue, validationOptions)(target, propertyKey);
  };
}
