import type {ValidationOptions}                         from 'class-validator';
import {ValidateNested as ClassValidatorValidateNested} from 'class-validator';

export function ValidateNested(validationOptions?: ValidationOptions) {
  return (target: any, propertyKey: string) => {
    ClassValidatorValidateNested(validationOptions)(target, propertyKey);
  };
}
