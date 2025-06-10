import 'reflect-metadata';
import {Expose}             from 'class-transformer';
import type {ExposeOptions} from 'class-transformer/types/interfaces';

export function Attribute(description: string, exposeOptions?: ExposeOptions) {
  return (target: any, propertyKey: string) => {
    Expose(exposeOptions)(target, propertyKey);
    Reflect.metadata('$description', description)(target, propertyKey);
  };
}
