import type {ValidationArguments, ValidationOptions} from 'class-validator';
import {registerDecorator}                           from 'class-validator';

interface Options extends ValidationOptions {
  readonly decoratorName?: string;
}

export function IsInstanceOfDecorator(targetType: any, options?: Options) {
  return (object: object, propertyName: string) => {
    registerDecorator({
      constraints: [targetType],
      name       : options?.decoratorName || 'isInstanceOf',
      options,
      propertyName,
      target     : object.constructor,
      validator  : {
        validate: (value: any, args: ValidationArguments) => {
          const [targetsType] = args.constraints;

          return value instanceof targetsType;
        },
      },
    });
  };
}
