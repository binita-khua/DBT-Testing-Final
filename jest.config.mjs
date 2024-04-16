module.exports = {
  preset: 'ts-jest/presets/default-esm',   // Preset for handling ECMAScript modules
  testEnvironment: 'node',                // Node environment, suitable for backend tests
  globals: {
    'ts-jest': {
      useESM: true,                       // Ensures ts-jest treats files as ESM
      tsconfig: 'tsconfig.json'           // Specifies the TypeScript configuration file
    }
  },
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',         // Resolves .js imports to .ts files
  },
  extensionsToTreatAsEsm: ['.ts'],        // Treat .ts files as ESM
  transformIgnorePatterns: [
    '/node_modules/(?!your-esm-module)',  // Optional: Transform specific modules
  ],
  testMatch: ['**/*.test.ts'],            // Pattern to locate test files
  transform: {
    "^.+\\.js$": "babel-jest"             // Transform .js files using babel-jest
  },
  setupFilesAfterEnv: ['./jest.setup.js'], // Load additional script after env setup
};

// In jest.setup.js
jest.setTimeout(60000); // Extends the default Jest timeout to 30 seconds
