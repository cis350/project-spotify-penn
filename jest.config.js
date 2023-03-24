module.exports = {
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/src/mocks/fileMock.js',
    '\\.(css|less)$': '<rootDir>/src/mocks/styleMock.js',
  },
  transformIgnorePatterns: ['node_modules/(?!@?axios)'],
  automock: false,
};
