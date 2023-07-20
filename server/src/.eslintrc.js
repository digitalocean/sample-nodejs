module.exports = {
  // parser: 'babel-eslint',
  extends: 'airbnb-base',
  // add your environment below the extends key, like this:
  parserOptions: {
    ecmaVersion: 2020
  },
  env: {
    node: true,
    es6: true,
  },
  plugins: ['import'],
  rules: {
    'no-underscore-dangle': 0,
    'comma-dangle': 0,
    'arrow-parens': 0,
    indent: 0,
    'implicit-arrow-linebreak': 0,
    'object-curly-newline': 0,
    'function-paren-newline': 0,
    'no-debugger': 'warn',
    'no-console': 'off'
  },
};
