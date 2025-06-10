import type {ValidationOptions}               from 'class-validator';
import {IsBoolean as ClassValidatorIsBoolean} from 'class-validator';

import {VALIDATE_MESSAGE} from '@/core/config/validate.config';

export function IsBoolean(validationOptions?: ValidationOptions) {
  return (target: any, propertyKey: string) => {
    validationOptions = Object.assign({
      message: () => VALIDATE_MESSAGE.isBoolean
    }, validationOptions ?? {});

    ClassValidatorIsBoolean(validationOptions)(target, propertyKey);
  };
}
