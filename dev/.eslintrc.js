module.exports = {
  env: {
    es6: true,
    browser: true,
    amd: true,
    jquery: true
  },
  'extends':'eslint:recommended',
  "plugins": ["react"],
  'rules': {
    'no-alert': 0,
    'no-bitwise': 0,
    'no-console': 0,
    'no-bitwise': 0,
    'comma-dangle': 0,
    'curly': 1,
    'eqeqeq': 0,
    'no-eq-null': 0,
    'guard-for-in': 1,
    'no-empty': 1,
    'no-use-before-define': 0,
    'no-obj-calls': 2,
    'no-unused-vars': 0,
    'new-cap': 1,
    'no-shadow': 0,
    'strict': 2,
    'no-invalid-regexp': 2,
    'no-undef': 1,
    'no-new': 1,
    'no-extra-semi': 1,
    'no-debugger': 2,
    'no-caller': 1,
    'quotes': 0,
    'no-unreachable': 2
  },
  "parserOptions": {
    "sourceType": "module",
      'ecmaFeatures':{
      'modules': true,
      'arrowFunctions': true,
      'classes': true,
      'defaultParams': true,
      'destructuring': true,
      'spread': true,
      'templateStrings': true,
      'jsx': true
    },
  },
  globals: {
    __ENV__: false,
    ga: false,
    config: false,
    React: false,
    ReactDOM: false,
    module: true
  }
}
