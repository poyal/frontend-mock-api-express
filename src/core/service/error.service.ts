import {ValidationError} from 'class-validator';

interface ErrorModel {
  code: string;
  errors?: any[];
  message: string;
}

export class ErrorService {
  private constructor() {
  }

  static NotFound(): ErrorModel {
    return {
      code   : 'E00010002',
      message: '해당 정보가 없습니다.'
    };
  }

  static Validate(errors: ValidationError[]): ErrorModel {
    return {
      code   : 'E00010001',
      errors : errors,
      message: '유효성 검사에 실패하였습니다.'
    };
  }
}
