const { isValidURL } = require("../validateURL");

describe("urlValidity", () => {
  test("test if strings are false urls", () => {
    expect(isValidURL("hello Udacity")).toBeFalsy();
  });

  test("emails are not considered valid urls", () => {
    expect(isValidURL("mailto:me@gmail.com")).toBeFalsy();
  });

 

  test("expect empty string to be falsy", () => {
    expect(isValidURL("")).toBeFalsy();
  });
});
