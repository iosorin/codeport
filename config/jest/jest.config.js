module.exports = {
    preset: 'ts-jest',

    rootDir: '../../',

    testEnvironment: 'jsdom',

    // The root of your source code, typically src
    // `<rootDir>` is a token Jest substitutes
    roots: ['<rootDir>/source/client'],

    // Jest transformations -- this adds support for TypeScript
    // using ts-jest
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
        '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '<rootDir>/config/jest/fileTransform.js',
    },

    transformIgnorePatterns: [
        '[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$',
        '^.+\\.module\\.(css|sass|scss)$',
    ],

    // setup env variables
    setupFiles: ['dotenv/config'],

    // Runs special logic, such as cleaning up components
    // when using React Testing Library and adds special
    // extended assertions to Jest
    setupFilesAfterEnv: ['@testing-library/jest-dom'],

    moduleNameMapper: {
        '@/(.*)$': '<rootDir>/source/client/$1',
        '@ui/(.*)$': '<rootDir>/source/client/library/.ui/$1',
        '@ui(.*)$': '<rootDir>/source/client/library/.ui',
        '@hooks(.*)$': '<rootDir>/source/client/library/hooks',
        '@services(.*)$': '<rootDir>/source/client/library/services',
        '@media/(.*)$': '<rootDir>/source/client/media/$1',
        '@styles/(.*)$': '<rootDir>/source/client/styles/$1',
        'types/(.*)$': '<rootDir>/source/shared/types/$1',
        'constants/(.*)$': '<rootDir>/source/shared/defaults/$1',
        'utils/(.*)$': '<rootDir>/source/shared/utils/$1',
    },

    // Test spec file resolution pattern
    // Matches parent folder `__tests__` and filename
    // should contain `test` or `spec`.
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',

    // Module file extensions for importing
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],

    globals: {
        'ts-jest': {
            tsconfig: '<rootDir>/config/jest/tsconfig.jest.json',
        },
    },
};
