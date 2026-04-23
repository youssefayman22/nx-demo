const nx = require('@nx/eslint-plugin');

module.exports = [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  {
    ignores: ['**/dist', '**/node_modules', '**/.storybook'],
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
              sourceTag: 'scope:demo-app',
              onlyDependOnLibsWithTags: ['scope:demo-app', 'scope:neo'],
            },
            {
              sourceTag: 'scope:neo',
              onlyDependOnLibsWithTags: ['scope:neo'],
            },
          ],
        },
      ],
    },
  },
];
