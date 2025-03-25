import type { Config } from 'jest';

const config: Config = {
  rootDir: './',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/test/jest.setup.ts'],
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
  },
  moduleNameMapper: {
    '.*\\.(svg|png|jpg|gif|ttf)$': '<rootDir>/test/mocks/fileMock.js',
  },
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json', // Certifique-se de que o tsconfig está correto
    },
  },
};

export default config;
