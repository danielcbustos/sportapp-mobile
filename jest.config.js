module.exports = {
  preset: "react-native",
  testEnvironment: "node",
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
  transformIgnorePatterns: [
    "node_modules/(?!((jest-)?react-native(-.*)?|@react-native(-community)?|@rneui|react-redux)/)",
  ],
  coverageReporters: ["json-summary", "text", "lcov"],
};
