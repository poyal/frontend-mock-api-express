import type {ValidationOptions}             from 'class-validator';
import {IsString as ClassValidatorIsString} from 'class-validator';

import {VALIDATE_MESSAGE} from '@/core/config/validate.config';

export function IsString(validationOptions?: ValidationOptions) {
  return (target: any, propertyKey: string) => {
    validationOptions = Object.assign({
      message: () => VALIDATE_MESSAGE.isString
    }, validationOptions ?? {});

    ClassValidatorIsString(validationOptions)(target, propertyKey);
  };
}
