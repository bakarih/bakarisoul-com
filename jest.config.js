/** @type {import('jest').Config} */
const config = {
  // Default environment is Node (middleware, robots/sitemap, content/lib
  // code). Component tests opt into jsdom per-file via a `@jest-environment
  // jsdom` docblock at the top of the file, matching interview-rubric-creator.
  testEnvironment: "node",
  roots: ["<rootDir>/__tests__"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  transform: {
    "^.+\\.(ts|tsx|js|mjs)$": [
      "ts-jest",
      {
        tsconfig: {
          // Automatic runtime (matches Next.js) so component .tsx files
          // don't need an explicit `import React`.
          jsx: "react-jsx",
          esModuleInterop: true,
          moduleResolution: "node",
          allowJs: true,
        },
        diagnostics: false,
      },
    ],
  },
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/**/*.d.ts",
    "!src/app/**/layout.tsx",
    "!src/app/**/opengraph-image.tsx",
  ],
  testPathIgnorePatterns: ["/node_modules/", "/.next/", "/__tests__/e2e/"],
};

module.exports = config;
