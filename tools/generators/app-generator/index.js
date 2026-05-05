const {
  formatFiles,
  generateFiles,
  joinPathFragments,
  names,
  readJson,
  writeJson,
} = require('@nx/devkit');
const { applicationGenerator } = require('@nx/react');

async function appGenerator(tree, options) {
  const { name, team } = options;
  const appName = `${team}-${name}`;
  const projectRoot = `apps/${team}/${name}`;

  // Step 1: Compose from Nx React/Vite application generator
  await applicationGenerator(tree, {
    name: appName,
    directory: projectRoot,
    style: 'css',
    bundler: 'vite',
    unitTestRunner: 'vitest',
    e2eTestRunner: 'cypress',
    routing: false,
    skipFormat: false,
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

  // E2E project configs - governance requires root-only ESLint
  const e2eProjectRoot = `${projectRoot}-e2e`;
  const e2eEslintCjsPath = joinPathFragments(e2eProjectRoot, 'eslint.config.cjs');
  if (tree.exists(e2eEslintCjsPath)) {
    tree.delete(e2eEslintCjsPath);
  }
  const e2eEslintPath = joinPathFragments(e2eProjectRoot, 'eslint.config.js');
  if (tree.exists(e2eEslintPath)) {
    tree.delete(e2eEslintPath);
  }

  // Remove lint target from e2e project - e2e projects don't need linting
  const e2eProjectJsonPath = joinPathFragments(e2eProjectRoot, 'project.json');
  if (tree.exists(e2eProjectJsonPath)) {
    const e2eProjectJson = readJson(tree, e2eProjectJsonPath);
    if (e2eProjectJson.targets && e2eProjectJson.targets.lint) {
      delete e2eProjectJson.targets.lint;
      writeJson(tree, e2eProjectJsonPath, e2eProjectJson);
    }
  }

  await formatFiles(tree);
}

module.exports = appGenerator;
module.exports.default = appGenerator;
