import {Injectable as InjectableDi} from '@decorators/di';
import {ClassConstructor}           from '@decorators/di/lib/src/types';

export function Injectable() {

  return (target: ClassConstructor): void => {
    InjectableDi()(target);
  };
}
