module.exports = {
  extends: ['turbo', 'next', 'prettier'],
  settings: {
    next: {
      rootDir: ['apps/*/', 'packages/*/'],
    },
  },
  plugins: ['simple-import-sort'],
  rules: {
    '@next/next/no-html-link-for-pages': 'off',
    'no-console': 'warn',
    'simple-import-sort/imports': 'warn',
    'simple-import-sort/exports': 'warn',
  },
  overrides: [
    {
      files: ['**/*.js', '**/*.ts', '**/*.tsx'],
      rules: {
        'simple-import-sort/imports': [
          'error',
          {
            groups: [
              ['^react$', '^next', '^[a-z]'],
              ['^@'],
              ['^~'],
              ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
              ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
              ['^.+\\.s?css$'],
              ['^\\u0000'],
            ],
          },
        ],
      },
    },
  ],
};
