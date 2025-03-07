module.exports = {
  transform: {
    "^.+\\.ts?$": "ts-jest",
  },
  testPathIgnorePatterns: ["./build"],
  collectCoverage: true
};
