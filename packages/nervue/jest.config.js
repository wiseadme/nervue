module.exports = {
  verbose: true,
  testEnvironment: 'jsdom',
  roots: [
    '<rootDir>',
  ],
  moduleFileExtensions: [
    'ts',
    'js',
  ],
  moduleDirectories: [
    'node_modules',
  ],
  transform: {
    '.*\\.(j|t)s$': 'ts-jest',
    '.*\\.ts$': 'babel-jest',
    '.*\\.(vue)$': 'vue-jest',
  },
  collectCoverageFrom: [
    'src/**/*.{js,ts}',
    '!**/*.d.ts',
  ],
  transformIgnorePatterns: [
    '<rootDir>/node_modules/',
  ],
  testMatch: [
    '**/*.spec.ts',
  ],
  globals: {
    'ts-jest': {
      babelConfig: true,
      diagnostics: false,
    },
  },
}
