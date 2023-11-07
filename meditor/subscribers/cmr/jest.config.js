/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    globals: {
        'ts-jest': {},
    },
    preset: 'ts-jest',
    restoreMocks: true,
    setupFiles: ['<rootDir>/jest.setup.ts'],
    setupFilesAfterEnv: ['<rootDir>/jest.setupAfter.ts'],
    testEnvironment: 'node',
}
