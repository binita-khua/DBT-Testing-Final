export default {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  globals: {
      'ts-jest': {
          useESM: true,
      }
  },
  moduleNameMapper: {
      '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  extensionsToTreatAsEsm: ['.ts'],
  transform: {},
  roots: ['<rootDir>/dist/'],
  testRegex: '.*\\.integrationtest\\.js$',
};

