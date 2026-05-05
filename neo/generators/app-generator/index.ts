import {
  Tree,
  formatFiles,
  generateFiles,
  joinPathFragments,
  names,
  readJson,
  writeJson,
} from '@nx/devkit';
import { applicationGenerator } from '@nx/react';

export interface AppGeneratorSchema {
  name: string;
  team: string;
  description?: string;
}

export default async function appGenerator(
  tree: Tree,
  options: AppGeneratorSchema
) {
  const { name, team } = options;
  const appName = `${team}-${name}`;
  const projectRoot = `apps/${team}/${name}`;

  // Step 1: Compose from Nx React/Vite application generator
  // This handles all the React+Vite scaffolding for us
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
  // (app, features, shared convention)
  const templateVars = {
    ...names(name),
    team,
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
  // Governance enforcement is root-only
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
