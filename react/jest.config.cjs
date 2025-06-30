module.exports = {
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest'
    },
    setupFiles: ['./src/components/jest.setup.js']
};