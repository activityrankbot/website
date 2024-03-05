/// <reference types="vite/client" />
/// <reference types="@remix-run/node" />

/// <reference types="vite-plugin-svgr/client" />

// prevent typing errors with vite-imagetools
declare module '*&format=webp' {
  const value: string;
  export default value;
}

// declared in vite.config.ts under the `define` field
declare const __APP_VERSION__: string;
declare const __COMMIT_HASH__: string;
