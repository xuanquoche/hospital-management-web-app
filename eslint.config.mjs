import { dirname } from 'path';
import { fileURLToPath } from 'url';

import { FlatCompat } from '@eslint/eslintrc';
import prettierPlugin from 'eslint-plugin-prettier';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      'out/**',
      'build/**',
      'next-env.d.ts',
      'src/components/ui/**',
      '**/*.d.ts',
    ],
    plugins: {
      prettier: prettierPlugin,
    },
    settings: {
      'import/resolver': {
        typescript: {
          project: './tsconfig.json',
        },
      },
    },
    rules: {
      'max-len': [
        'error',
        {
          code: 80, // Giới hạn 80 ký tự mỗi dòng
          tabWidth: 2,
          ignoreUrls: true, // Bỏ qua URLs dài
          ignoreStrings: true, // Bỏ qua strings dài
          ignoreTemplateLiterals: true, // Bỏ qua template literals dài
          ignoreComments: false, // Kiểm tra comments
          ignoreRegExpLiterals: true, // Bỏ qua regex dài
          ignorePattern: '^\\s*import\\s.+from\\s.+;$', // Bỏ qua import statements dài
        },
      ],
      'prettier/prettier': [
        'error',
        {
          singleQuote: true,
          jsxSingleQuote: true,
          printWidth: 80,
          bracketSpacing: true,
          bracketSameLine: false,
        },
      ],
      quotes: 'off',

      // JS/TS
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',

      // React
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-vars': 'error',
      'react/prop-types': 'off',
      'react/no-unescaped-entities': 'off',

      // TypeScript comments
      '@typescript-eslint/ban-ts-comment': [
        'error',
        {
          'ts-expect-error': 'allow-with-description',
          'ts-ignore': true,
          'ts-nocheck': true,
          'ts-check': false,
        },
      ],

      // Import order
      'import/order': [
        'warn',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            ['parent', 'sibling', 'index'],
          ],
          pathGroups: [
            {
              pattern: '@/**',
              group: 'internal',
              position: 'after',
            },
          ],
          pathGroupsExcludedImportTypes: ['builtin'],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/triple-slash-reference': 'off',
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
];

export default eslintConfig;
