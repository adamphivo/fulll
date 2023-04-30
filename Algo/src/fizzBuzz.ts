/**
 * A function that implements the FizzBuzz algorithm
 * @param N The range from 1 to N
 */
export default function fizzBuzz(N: number): string {
  const fizzString = "Fizz";
  const buzzString = "Buzz";

  // Creates an array containing int from 1 to N included
  const arr = Array.from({ length: N }, (_, index) => index + 1);

  const replaced = arr.map((item) => {
    if (item % 3 === 0 && item % 5 === 0) return fizzString + buzzString;
    if (item % 3 === 0) return fizzString;
    if (item % 5 === 0) return buzzString;
    else return item.toString();
  });

  return replaced.join(",");
}
