const { resolve } = require('path');

module.exports = {
  bail: true,
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ['lib/**/*.{ts,tsx}'],
  coverageDirectory: '__tests__/coverage',
  coverageReporters: ['json', 'lcov'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  testMatch: ['**/__tests__/**/*.spec.+(ts|tsx|js)'],
  setupFilesAfterEnv: [resolve('./tests/setupTest.tsx')],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
};
