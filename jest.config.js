module.exports = {
    moduleDirectories: ['node_modules', 'src'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    preset: 'react-native',
    testEnvironment: 'jsdom',
    testMatch: ['**/test/**', '!**/src/**'],
    testPathIgnorePatterns: ['<rootDir>/node_modules/'],
    transform: {
        '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    },
    transformIgnorePatterns: ['node_modules/(?!(@react-native|react-native)/)'],
};
