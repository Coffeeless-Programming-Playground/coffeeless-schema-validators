module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.(ts)',
    '!**/*d.ts',
    '!<rootDir>/src/validators/index.ts',
    '!<rootDir>/src/errors/index.ts',
    '!<rootDir>/src/protocols/index.ts',
    '!<rootDir>/src/index.ts',
  ],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  coverageDirectory: 'coverage',
  moduleNameMapper: {
    '@errors/(.*)$': '<rootDir>/src/errors/$1',
    '@protocols/(.*)$': '<rootDir>/src/protocols/$1',
    '@validators/(.*)$': '<rootDir>/src/validators/$1',
  },
  transform: {
    '.+\\.ts$': 'ts-jest'
  }
}