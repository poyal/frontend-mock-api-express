import type {ValidationOptions}             from 'class-validator';
import {IsNumber as ClassValidatorIsNumber} from 'class-validator';
import type {IsNumberOptions}               from 'class-validator/types/decorator/typechecker/IsNumber';

import {VALIDATE_MESSAGE} from '@/core/config/validate.config';

export function IsNumber(options?: IsNumberOptions, validationOptions?: ValidationOptions) {
  return (target: any, propertyKey: string) => {
    validationOptions = Object.assign({
      message: () => VALIDATE_MESSAGE.isNumber
    }, validationOptions ?? {});

    ClassValidatorIsNumber(options, validationOptions)(target, propertyKey);
  };
}
