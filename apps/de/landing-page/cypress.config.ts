/// <reference types="node" />
import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';
import { defineConfig } from 'cypress';
export default defineConfig({
  e2e: {
    ...nxE2EPreset(__filename, {
      cypressDir: 'landing-page-e2e',
      bundler: 'vite',
    }),
  },
});
