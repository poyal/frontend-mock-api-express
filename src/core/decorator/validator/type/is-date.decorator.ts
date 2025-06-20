import type {ValidationOptions} from 'class-validator';
import {IsDate as ClassValidatorIsDate} from 'class-validator';

import {VALIDATE_MESSAGE} from '@/core/config/validate.config';

export function IsDate(validationOptions?: ValidationOptions) {
  return (target: any, propertyKey: string) => {
    validationOptions = Object.assign(
      {
        message: () => VALIDATE_MESSAGE.isDate
      },
      validationOptions ?? {}
    );

    ClassValidatorIsDate(validationOptions)(target, propertyKey);
  };
}
