import type {ValidationOptions}                         from 'class-validator';
import {IsNumberString as ClassValidatorIsNumberString} from 'class-validator';
import type {IsNumericOptions}                          from 'validator';

import {VALIDATE_MESSAGE} from '@/core/config/validate.config';

export function IsNumberString(options?: IsNumericOptions, validationOptions?: ValidationOptions) {
  return (target: any, propertyKey: string) => {
    validationOptions = Object.assign({
      message: () => VALIDATE_MESSAGE.isNumberString
    }, validationOptions ?? {});

    ClassValidatorIsNumberString(options, validationOptions)(target, propertyKey);
  };
}
