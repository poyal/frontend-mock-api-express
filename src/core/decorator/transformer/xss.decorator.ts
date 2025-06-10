import type {TransformFnParams}         from 'class-transformer';
import {Transform}                      from 'class-transformer';
import type {Config as DOMPurifyConfig} from 'isomorphic-dompurify';

import {XssService} from '@/core/service/xss.service';
import {XSS_CONFIG} from '@/core/config/xss.config';

const service: XssService = new XssService();

function decoratorEncodeXss(value: TransformFnParams, config: DOMPurifyConfig = XSS_CONFIG.DEFAULT): any {
  let params = value.obj[value.key];
  params = service.encodeXss(params, config);
  return params;
}

export function XssRequest(config: DOMPurifyConfig = XSS_CONFIG.DEFAULT) {
  return (target: any, propertyKey: string) => {
    Transform(
      (value: TransformFnParams) => decoratorEncodeXss(value, config),
      {toPlainOnly: true})
    (target, propertyKey);
  };
}

function decoratorDecodeXss(value: TransformFnParams, config: DOMPurifyConfig = XSS_CONFIG.DEFAULT): any {
  let params = value.obj[value.key];
  params = service.decodeXss(params, config);
  return params;
}

export function XssResponse(config: DOMPurifyConfig = XSS_CONFIG.DEFAULT) {
  return (target: any, propertyKey: string) => {
    Transform(
      (value: TransformFnParams) => decoratorDecodeXss(value, config),
      {toClassOnly: true}
    )(target, propertyKey);
  };
}
