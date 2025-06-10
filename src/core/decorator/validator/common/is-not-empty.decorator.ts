import type {ValidationOptions}                 from 'class-validator';
import {IsNotEmpty as ClassValidatorIsNotEmpty} from 'class-validator';

import {VALIDATE_MESSAGE} from '@/core/config/validate.config';

export function IsNotEmpty(validationOptions?: ValidationOptions) {
  return (target: any, propertyKey: string) => {
    validationOptions = Object.assign({
      message: () => VALIDATE_MESSAGE.isNotEmpty
    }, validationOptions ?? {});

    ClassValidatorIsNotEmpty(validationOptions)(target, propertyKey);
  };
}
