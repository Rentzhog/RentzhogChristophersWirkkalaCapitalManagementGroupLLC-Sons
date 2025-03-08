module.exports = {
  transform: {
    "^.+\\.ts?$": "ts-jest",
  },
  testPathIgnorePatterns: ["./dist"],
  collectCoverage: true,
};
