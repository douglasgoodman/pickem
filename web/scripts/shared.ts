import { BuildOptions } from 'esbuild';

export const baseBuildOptions: BuildOptions = {
    entryPoints: ['src/index.tsx'],
    bundle: true,
    sourcemap: true,
    loader: {
        '.woff': 'file',
        '.woff2': 'file',
        '.png': 'file',
    },
    logLevel: 'info',
};
