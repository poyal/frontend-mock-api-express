import Container          from '@/core/container';
import {GeneratorService} from '@/core/service/generator.service';

import {SampleEntity} from '@/app/sample/entity/sample.entity';

const generator: GeneratorService = Container.resolve(GeneratorService);
export const DEFAULT: SampleEntity.Sample[] = generator.creates(SampleEntity.Sample, 5);
