const { resolve } = require('path');

module.exports = {
  bail: true,
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ['lib/**/*.{ts,tsx}'],
  coverageReporters: ['json', 'lcov'],
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0,
    },
  },
  testMatch: ['**/__tests__/**/*.spec.+(ts|tsx|js)'],
  setupFilesAfterEnv: [
    resolve('./tests/setupTest.tsx'),
    resolve('./lib/setupEnzyme.ts')
  ],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
};
