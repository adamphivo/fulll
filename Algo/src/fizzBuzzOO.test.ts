import assert from "assert";
import FizzBuzz from "./fizzBuzzOO";

describe("FizzBuzz Class tests suite", () => {
  it("Should return the string 1 when given 1", () => {
    // Arrange
    const fizzBuzz = new FizzBuzz();
    // Act
    const result = fizzBuzz.main(1);
    // Assert
    assert.strictEqual(result, "1");
  });
  it("Should replace the number by the string Fizz if number can be divided by 3", () => {
    // Arrange
    const fizzBuzz = new FizzBuzz();
    // Act
    const result = fizzBuzz.main(3);
    // Assert
    assert.strictEqual(result, "12Fizz");
  });

  it("Should replace the number by the string Buzz if number can be divided by 5", () => {
    // Arrange
    const fizzBuzz = new FizzBuzz();
    // Act
    const result = fizzBuzz.main(5);
    // Assert
    assert.strictEqual(result, "12Fizz4Buzz");
  });

  it("Should replace the number by the string FizzBuzz if number can be divided by 3 AND 5", () => {
    // Arrange
    const fizzBuzz = new FizzBuzz();
    // Act
    const result = fizzBuzz.main(15);
    // Assert
    assert.strictEqual(result, "12Fizz4BuzzFizz78FizzBuzz11Fizz1314FizzBuzz");
  });

  it("Should allow the user to add a custom rule", () => {
    // Arrange
    const fizzBuzz = new FizzBuzz();
    fizzBuzz.addRule({ multiplier: 2, replacement: "Bozz" });
    // Act
    const result = fizzBuzz.main(3);
    // Assert
    assert.strictEqual(result, "1BozzFizz");
  });
});
