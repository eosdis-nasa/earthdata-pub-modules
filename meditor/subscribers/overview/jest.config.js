/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    coveragePathIgnorePatterns: ['__fixtures__', '__mocks__', '__tests__'],
    globals: {
        'ts-jest': {},
    },
    preset: 'ts-jest',
    restoreMocks: true,
    setupFiles: ['<rootDir>/jest.setup.ts'],
    setupFilesAfterEnv: ['<rootDir>/jest.setupAfter.ts'],
    testEnvironment: 'node',
}
