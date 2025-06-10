import type {ValidationOptions}                 from 'class-validator';
import {ValidateIf as ClassValidatorValidateIf} from 'class-validator';

export function ValidateIf(condition: (object: any, value: any) => boolean, validationOptions?: ValidationOptions) {
  return (target: any, propertyKey: string) => {
    ClassValidatorValidateIf(condition, validationOptions)(target, propertyKey);
  };
}
