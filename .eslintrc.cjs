/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root:    true,
  extends: ['eslint:recommended'],

  ignorePatterns: ['build', 'dist', 'public'],

  parser: '@typescript-eslint/parser',

  parserOptions: {
    sourceType:  'module',
    ecmaVersion: 'latest'
  },

  rules: {
    'no-console': 'off',

    'no-undef': 'off',

    'quotes': ['error', 'single', {'allowTemplateLiterals': true}],

    'semi': ['error', 'always'],

    'no-extra-semi': 'error',

    'no-debugger': 'off',

    'semi-spacing': 'error',

    'no-extra-boolean-cast': 'off',

    'no-case-declarations': 'off',

    'no-unused-vars': 'off',

    'no-unexpected-multiline': 'off',
  }
};
