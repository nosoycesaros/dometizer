import eslint from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';

export default [
  eslint.configs.recommended,
  {
    ignores: [
      'node_modules/',
      'dist/',
      '*.min.js',
      'rollup.config.js',
      'bunfig.toml',
      'happydom.ts',
    ],
  },
  {
    files: ['src/**/*.ts'],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: 2017,
        sourceType: 'module',
      },
      globals: {
        // Browser/DOM globals
        window: 'readonly',
        document: 'readonly',
        console: 'readonly',
        HTMLElement: 'readonly',
        DocumentFragment: 'readonly',
        Event: 'readonly',
        // Node globals 
        process: 'readonly',
        Buffer: 'readonly',
        // ES2017 globals
        Promise: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
    },
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
  },
  {
    files: ['src/**/*.test.ts'],
    rules: {
      'no-undef': 'off', // Bun test globals not recognized
    },
  },
];