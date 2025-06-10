import type {ValidationOptions}               from 'class-validator';
import {MaxLength as ClassValidatorMaxLength} from 'class-validator';

import {VALIDATE_MESSAGE} from '@/core/config/validate.config';

export function MaxLength(maxValue: number, validationOptions?: ValidationOptions) {
  return (target: any, propertyKey: string) => {
    validationOptions = Object.assign({
      message: () => VALIDATE_MESSAGE.maxLength
    }, validationOptions ?? {});

    ClassValidatorMaxLength(maxValue, validationOptions)(target, propertyKey);
  };
}
