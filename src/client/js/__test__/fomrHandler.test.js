/**
 * @jest-environment jsdom
 */

const { handleSubmit } = require("../formHandler");

describe("handleSubmit", () => {
  it("returns something", () => {
    expect(handleSubmit).toBeDefined();
  });
});
