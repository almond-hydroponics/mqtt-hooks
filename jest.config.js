const { resolve } = require('path');

module.exports = {
	verbose: true,
	bail: true,
	clearMocks: true,
	collectCoverageFrom: ['lib/*.tsx', '!lib/setupTest.tsx'],
	coverageReporters: ['html', 'json', 'lcov', 'text', 'clover'],
	coverageThreshold: {
		global: {
			branches: 80,
			functions: 80,
			lines: 80,
			statements: 80,
		},
	},
	preset: 'ts-jest',
	testMatch: ['**/__tests__/**/*.spec.+(ts|tsx|js)'],
	setupFilesAfterEnv: [resolve('./lib/setupTest.tsx')],
	transform: {
		'^.+\\.(ts|tsx)$': 'ts-jest',
	},
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
};
