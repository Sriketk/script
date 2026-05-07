import { defineConfig } from "oxlint";
import core from "ultracite/oxlint/core";
import react from "ultracite/oxlint/react";

export default defineConfig({
  extends: [core, react],
  ignorePatterns: [
    "packages/ui/src/components/**",
    "apps/web/src/components/**",
    "apps/web/src/routeTree.gen.ts",
  ],
});
