import type {ValidationOptions, ValidationArguments, ValidatorConstraintInterface} from 'class-validator';
import {registerDecorator, ValidatorConstraint}                                    from 'class-validator';

import {VALIDATE_MESSAGE} from '@/core/config/validate.config';

export function IsEnum(enumInstance: any, validationOptions?: ValidationOptions) {
  return (target: object, propertyName: string) => {
    registerDecorator({
      target     : target.constructor,
      propertyName,
      options    : validationOptions,
      constraints: [enumInstance],
      validator  : IsEnumValidate,
    });
  };
}

@ValidatorConstraint({name: 'isEnum'})
export class IsEnumValidate implements ValidatorConstraintInterface {
  validate(target: any, args: ValidationArguments): boolean {
    let returnValue: boolean = false;

    if (!!args.value) {
      // if (args.value.constructor.name === args.constraints[0].name) {
      if (args.value.constructor === args.constraints[0]) {
        returnValue = true;
      }
    }

    return returnValue;
  }

  defaultMessage(args: ValidationArguments) {
    return VALIDATE_MESSAGE.isEnum;
  }
}
