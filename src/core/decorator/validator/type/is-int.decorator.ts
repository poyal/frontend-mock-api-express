import type {ValidationOptions}       from 'class-validator';
import {IsInt as ClassValidatorIsInt} from 'class-validator';

import {VALIDATE_MESSAGE} from '@/core/config/validate.config';

export function IsInt(validationOptions?: ValidationOptions) {
  return (target: any, propertyKey: string) => {
    validationOptions = Object.assign({
      message: () => VALIDATE_MESSAGE.isInt
    }, validationOptions ?? {});

    ClassValidatorIsInt(validationOptions)(target, propertyKey);
  };
}
