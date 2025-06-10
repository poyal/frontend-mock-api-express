import type {ValidationOptions}           from 'class-validator';
import {IsArray as ClassValidatorIsArray} from 'class-validator';

import {VALIDATE_MESSAGE} from '@/core/config/validate.config';

export function IsArray(validationOptions?: ValidationOptions) {
  return (target: any, propertyKey: string) => {
    validationOptions = Object.assign({
      message: () => VALIDATE_MESSAGE.isArray
    }, validationOptions ?? {});

    ClassValidatorIsArray(validationOptions)(target, propertyKey);
  };
}
