import type {ValidationOptions}                 from 'class-validator';
import {IsOptional as ClassValidatorIsOptional} from 'class-validator';

export function IsOptional(validationOptions?: ValidationOptions) {
  return (target: any, propertyKey: string) => {
    ClassValidatorIsOptional(validationOptions)(target, propertyKey);
  };
}
