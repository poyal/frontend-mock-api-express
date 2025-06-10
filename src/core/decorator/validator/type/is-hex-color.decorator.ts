import type {ValidationOptions}                 from 'class-validator';
import {IsHexColor as ClassValidatorIsHexColor} from 'class-validator';

import {VALIDATE_MESSAGE} from '@/core/config/validate.config';

export function IsHexColor(validationOptions?: ValidationOptions) {
  return (target: any, propertyKey: string) => {
    validationOptions = Object.assign({
      message: () => VALIDATE_MESSAGE.isHexColor
    }, validationOptions ?? {});

    ClassValidatorIsHexColor(validationOptions)(target, propertyKey);
  };
}
