/// <reference types="vitest"/>

import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    includeSource: ["src/**/*.{js,ts}"],
    include: ["**/*.{test,spec}.{js,ts}"],
  },
});
