import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    includeSource: ["src/**/*.{js,ts}", "tests/**/*.{js,ts}"],
    include: ["**/*.{test,spec}.{js,ts}"],
  },
  resolve: {
    alias: {
      app: path.resolve(__dirname, "./src/application/"),
      domain: path.resolve(__dirname, "./src/domain/"),
      infra: path.resolve(__dirname, "./src/infrastructure/"),
      utils: path.resolve(__dirname, "./src/utils/"),
      tests: path.resolve(__dirname, "./tests/"),
      docs: path.resolve(__dirname, "./docs/"),
    },
  },
});
