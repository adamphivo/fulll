import fizzBuzz from "./fizzBuzz";

describe("fizzBuzz function", () => {
  it("Should return the correct string given a specific number", () => {
    expect(fizzBuzz(3)).toBe("1,2,Fizz");
    expect(fizzBuzz(10)).toBe("1,2,Fizz,4,Buzz,Fizz,7,8,Fizz,Buzz");
  });
  it("Should return an empty string if N is negative", () => {
    expect(fizzBuzz(-10)).toBe("");
  });
});
