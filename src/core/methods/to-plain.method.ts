import {instanceToPlain}            from 'class-transformer';
import type {ClassTransformOptions} from 'class-transformer/types/interfaces';

export function ToPlain(args: any[], classTransformOptions?: ClassTransformOptions) {
  const returnValue: any[] = [];

  args.forEach((arg: any) => {
    returnValue.push(instanceToPlain(arg, classTransformOptions));
  });

  return returnValue;
}
