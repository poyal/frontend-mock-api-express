import type {Config as DOMPurifyConfig} from 'isomorphic-dompurify';

export namespace XSS_CONFIG {
  export const DEFAULT: DOMPurifyConfig = XSS_CONFIG.EDITOR;

  export const EDITOR: DOMPurifyConfig = {
    ALLOWED_TAGS   : [
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'a', 'p', 'b', 'i', 'span', 'strike', 'strong',
      'div', 'ul', 'li', 'br', 'hr',
      'table', 'thead', 'tbody', 'tfoot', 'tr', 'th', 'td',
      'img'
    ],
    ALLOWED_ATTR   : ['class', 'style', 'href', 'rel', 'title', 'target', 'width', 'height', 'src', 'alt', 'rowspan', 'colspan'],
    WHOLE_DOCUMENT : false,
    ALLOW_ARIA_ATTR: false,
    ALLOW_DATA_ATTR: false,
  };

  export const HTML: DOMPurifyConfig = {
    ALLOWED_TAGS   : [
      'html', 'head', 'meta', 'title', 'body', 'header',
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'a', 'p', 'b', 'i', 'span', 'strike', 'strong',
      'div', 'ul', 'li', 'br', 'hr',
      'table', 'thead', 'tbody', 'tfoot', 'tr', 'th', 'td',
      'img'
    ],
    ALLOWED_ATTR   : ['class', 'style', 'href', 'rel', 'title', 'target', 'width', 'height', 'src', 'alt', 'rowspan', 'colspan', 'lang', 'charset', 'name', 'content', 'http-equiv'],
    WHOLE_DOCUMENT : true,
    ALLOW_ARIA_ATTR: false,
    ALLOW_DATA_ATTR: false,
  };
}
