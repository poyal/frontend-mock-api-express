import 'reflect-metadata';
import {container} from 'tsyringe';

export function Inject() {
  return (target: any, propertyKey: string | symbol): any => {
    const type = Reflect.getMetadata('design:type', target, propertyKey);

    return Object.defineProperty(target, propertyKey, {
      get: () => container.resolve(type)
    }) as any;
  };
}
