const nx = require('@nx/eslint-plugin');

module.exports = [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  {
    ignores: [
      '**/dist',
      '**/node_modules',
      '**/.storybook',
      '**/vite.config.*.timestamp*',
      '**/vitest.config.*.timestamp*',
      '**/e2e/**',
      '**/*-e2e/**',
      '**/*.e2e.ts',
      '**/*.e2e.js',
      '**/*.cy.ts',
      '**/*.cy.js',
      '**/cypress/**',
      '**/cypress.config.ts',
      '**/cypress.config.js',
      '**/cypress.config.mjs',
    ],
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: [],
          depConstraints: [
            {
              sourceTag: 'scope:internal',
              onlyDependOnLibsWithTags: ['scope:public'],
            },
            {
              sourceTag: 'scope:public',
              onlyDependOnLibsWithTags: ['scope:public'],
            },
            {
              sourceTag: 'scope:tools',
              onlyDependOnLibsWithTags: ['scope:public', 'scope:tools'],
            },
          ],
        },
      ],
    },
  },
];
