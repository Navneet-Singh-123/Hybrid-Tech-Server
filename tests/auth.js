const chai = require("chai");
const expect = chai.expect;

describe("Authentication Tests", () => {
  it("Should compare some values", () => {
    expect(1).to.equal(1);
    console.log("Env: ", process.env.NODE_ENV);
  });
});
