import {Validator, ValidationError} from 'class-validator';

import {Injectable}   from '@/core/decorator';
import {ErrorService} from '@/core/service/error.service';

@Injectable()
export class ValidateService {
  private validator: Validator = new Validator();

  check(...args: any[]) {
    let errors: ValidationError[] = [];

    args.forEach((arg: any) => {
      errors = this.validator.validateSync(arg);
    });

    if (errors?.length > 0) {
      throw ErrorService.Validate(errors);
    }
  }
}


