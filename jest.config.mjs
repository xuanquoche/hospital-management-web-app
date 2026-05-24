import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  collectCoverageFrom: [
    'src/hooks/use-debounce-search.ts',
    'src/hooks/use-debounce.ts',
    'src/hooks/use-mobile.ts',
    'src/lib/fetcher.ts',
    'src/lib/utils.ts',
    'src/store/use-appointment-store.ts',
    'src/store/use-user-store.ts',
    'src/utils/Helpers.ts',
  ],
  coveragePathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testEnvironment: 'jsdom',
};

export default createJestConfig(customJestConfig);
