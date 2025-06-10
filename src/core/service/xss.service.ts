import type {Config as DOMPurifyConfig} from 'isomorphic-dompurify';
import DOMPurify                        from 'isomorphic-dompurify';

import {XSS_CONFIG} from '@/core/config/xss.config';

export class XssService {
  encodeXss<T extends string>(value: T, config: DOMPurifyConfig = XSS_CONFIG.DEFAULT): T {
    value = this.encodeLtGt(this.toSanitize(value, config)) as T;
    return value as T;
  }

  decodeXss<T extends string>(value: T, config: DOMPurifyConfig = XSS_CONFIG.DEFAULT): T {
    value = this.toSanitize(this.decodeLtGt(value), config) as T;
    return value as T;
  }

  toSanitize(item: string, config: DOMPurifyConfig = XSS_CONFIG.DEFAULT): string {
    return DOMPurify.sanitize(item, config) as string;
  }

  encodeLtGt(item: string): string {
    return item
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  decodeLtGt(item: string): string {
    return item
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>');
  }
}
