module.exports = {
    verbose: true,
    moduleNameMapper: {
      '\\.css$': 'identity-obj-proxy',
      '\\.(jpg|jpeg|png|gif|svg)$': 'jest-transform-stub'
    },
    transform: {
      '^.+\\.jsx?$': 'babel-jest'
    },
    testEnvironment: 'jsdom',
    setupFiles: ['./jest.setup.js'],
  };
  