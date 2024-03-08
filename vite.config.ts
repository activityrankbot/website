import { defineConfig } from 'vite';
import { installGlobals } from '@remix-run/node';
import { vitePlugin as remix } from '@remix-run/dev';
import tsconfigPaths from 'vite-tsconfig-paths';
import { imagetools } from 'vite-imagetools';
import { flatRoutes } from 'remix-flat-routes';

import child_process from 'node:child_process';

installGlobals();

// run a CLI process to get the latest git hash
const __COMMIT_HASH__ =
  process.env.GIT_COMMIT && process.env.GIT_COMMIT !== 'unspecified'
    ? process.env.GIT_COMMIT
    : child_process.execSync('git log --format=%h -n1').toString().trim() ??
      'xxxxxxx';

// get latest git tag
const __APP_VERSION__ = process.env.APP_VERSION
  ? process.env.APP_VERSION
  : child_process
      .execSync('git describe --tags --abbrev=0')
      .toString()
      .trim() ?? 'v0.0.0';

export default defineConfig({
  plugins: [
    remix({
      future: {
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
      },
      ignoredRouteFiles: ['**/*'],
      routes: async (defRoutes) =>
        flatRoutes('routes', defRoutes, { ignoredRouteFiles: ['**/.*'] }),
    }),
    tsconfigPaths(),
    // allow specifying image sizes in import strings
    imagetools(),
  ],
  // allow importing toml files as assets
  assetsInclude: ['**/*.toml'],
  define: {
    __COMMIT_HASH__: JSON.stringify(__COMMIT_HASH__),
    __APP_VERSION__: JSON.stringify(__APP_VERSION__),
  },
});
