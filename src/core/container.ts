import {container}         from 'tsyringe';
import type InjectionToken from 'tsyringe/dist/typings/providers/injection-token';

export default class Container {
  static resolve<T>(params: InjectionToken<T>): T {
    return container.resolve(params);
  }
}
