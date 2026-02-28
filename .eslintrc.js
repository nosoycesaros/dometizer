module.exports = {
  root: true,
  env: {
    browser: true,
    es2017: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  extends: ['eslint:recommended'],
  rules: {
    // Bug prevention rules (not style preferences)
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
    'no-undef': 'error',
    'no-redeclare': 'off',
    '@typescript-eslint/no-redeclare': 'error',
    
    // Disable style rules (handled by Prettier)
    'indent': 'off',
    'quotes': 'off',
    'semi': 'off',
    'comma-dangle': 'off',
    'object-curly-spacing': 'off',
    'array-bracket-spacing': 'off',
  },
  overrides: [
    {
      files: ['**/*.test.ts'],
      rules: {
        'no-undef': 'off', // Bun test globals not recognized
      },
    },
  ],
};