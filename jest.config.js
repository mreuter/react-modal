module.exports = {
  testEnvironment: 'jsdom',
  testMatch: [
    '<rootDir>/src/**/*.test.js',
  ],
  transform: {
    '^.+\\.(js|jsx|mjs)$': 'babel-jest',
  },
  transformIgnorePatterns: [
    '[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs)$',
  ],
  modulePaths: [
    '<rootDir>/node_modules',
  ],
  collectCoverage: true,
  coverageReporters: ['html', 'lcov'],
};
