import { defineConfig } from 'tsup'

export default defineConfig({
  entry: {
    index: 'src/command-center.tsx',
  },
  format: ['esm', 'cjs'],
  dts: {
    entry: 'src/command-center.tsx',
    compilerOptions: {
      // Also generate .d.mts for ESM consumers
      composite: false,
    },
  },
  splitting: false,
  sourcemap: true,
  clean: true,
  minify: false,
  external: ['react', 'react-dom', 'lucide-react'],
  banner: {
    js: "'use client';",
  },
})
