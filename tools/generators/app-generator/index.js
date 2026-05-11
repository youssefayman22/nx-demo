const {
  formatFiles,
  generateFiles,
  joinPathFragments,
  names,
  readJson,
  writeJson,
} = require('@nx/devkit');
const { applicationGenerator } = require('@nx/react');
const { configurationGenerator } = require('@nx/cypress');

async function appGenerator(tree, options) {
  const { name, team } = options;
  const appName = `${team}-${name}`;
  const projectRoot = `apps/${team}/${name}`;
  const e2eDirectory = `${name}-e2e`;

  // Step 1: Compose from Nx React/Vite application generator (without e2e)
  await applicationGenerator(tree, {
    name: appName,
    directory: projectRoot,
    style: 'css',
    bundler: 'vite',
    linter: 'eslint',
    unitTestRunner: 'vitest',
    e2eTestRunner: 'none',
    routing: false,
    skipFormat: false,
  });

  // Step 1b: Add Cypress e2e configuration inside the app directory.
  // This keeps team apps colocated while avoiding a separate top-level e2e project.
  await configurationGenerator(tree, {
    project: appName,
    directory: e2eDirectory,
    devServerTarget: `${appName}:serve`,
    bundler: 'vite',
    linter: 'none',
    skipFormat: true,
  });

  // Step 2: Apply governance tags to the generated project.json
  const projectJsonPath = joinPathFragments(projectRoot, 'project.json');
  const projectJson = readJson(tree, projectJsonPath);
  projectJson.tags = [`type:app`, `team:${team}`, `scope:internal`];
  writeJson(tree, projectJsonPath, projectJson);

  // Step 3: Generate feature-based folder structure
  const templateVars = {
    ...names(name),
    team,
    projectName: appName,
    appName,
    projectRoot,
    tmpl: '',
  };

  generateFiles(
    tree,
    joinPathFragments(__dirname, 'files'),
    projectRoot,
    templateVars
  );

  // Step 4: Ensure no per-project ESLint config is generated
  // Main app project
  const eslintPath = joinPathFragments(projectRoot, 'eslint.config.js');
  if (tree.exists(eslintPath)) {
    tree.delete(eslintPath);
  }
  const eslintJsonPath = joinPathFragments(projectRoot, '.eslintrc.json');
  if (tree.exists(eslintJsonPath)) {
    tree.delete(eslintJsonPath);
  }

  await formatFiles(tree);
}

module.exports = appGenerator;
module.exports.default = appGenerator;
