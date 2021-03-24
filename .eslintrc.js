module.exports = {
    env: {
      browser: true,
      node: true,
      commonjs: true,
      cjs:true
    },
    parser: '@typescript-eslint/parser',
    extends: [
      'plugin:react/recommended',
      'plugin:@typescript-eslint/recommended',
      'prettier/@typescript-eslint',
      'plugin:prettier/recommended',
    ],
    plugins: ['@typescript-eslint'],
    settings: {
      react: {
        pragma: 'React',
        version: 'detect'
      }
    },
    parserOptions: {
      ecmaVersion: 2019,
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true
      }
    },
    rules: {
      'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      semi: ['error', 'always'],
      eqeqeq: 'off',
      'linebreak-style': ['error', 'unix'],
      'no-useless-call': 'off',
      'space-before-function-paren': ['error', { anonymous: 'always', named: 'never', asyncArrow: 'always' }]
    }
  };