import Container          from '@/core/container';
import {GeneratorService} from '@/core/service/generator.service';

import {UserEntity} from '@/app/user/entity/user.entity';

const generator: GeneratorService = Container.resolve(GeneratorService);
export const DEFAULT: UserEntity.User[] = generator.creates(UserEntity.User);
