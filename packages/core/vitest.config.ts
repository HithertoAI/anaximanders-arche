// packages/core/vitest.config.ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom', // Needed if you test anything that might use browser APIs later
    globals: true,
  },
});
