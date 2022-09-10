module.exports = {
  verbose: true,
  testEnvironment: 'jest-environment-jsdom-fourteen',
  roots: [
    '<rootDir>',
  ],
  moduleFileExtensions: [
    'ts',
    'js',
  ],
  moduleDirectories: [
    'node_modules',
    // 'packages/nervue/node_modules'
  ],
  transform: {
    '.*\\.(j|t)s$': 'ts-jest',
    '.*\\.ts$': 'babel-jest',
    '.*\\.(vue)$': 'vue-jest',
  },
  collectCoverageFrom: [
    'packages/nervue/src/**/*.{js,ts}',
    '!**/*.d.ts',
  ],
  transformIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/packages/nervue/node_modules/',
  ],
  testMatch: [
    '**/tests/**/*.spec.ts',
  ],
  globals: {
    'ts-jest': {
      babelConfig: true,
      // tsConfig: '<rootDir>/tsconfig.json',
      diagnostics: false,
    },
  },
}
