interface Rule {
  multiplier: number;
  replacement: string;
}

export default class FizzBuzz {
  private result: string = "";
  private readonly FIZZ_STRING = "Fizz";
  private readonly BUZZ_STRING = "Buzz";

  private rules: Rule[] = [
    {
      multiplier: 3,
      replacement: this.FIZZ_STRING,
    },
    {
      multiplier: 5,
      replacement: this.BUZZ_STRING,
    },
  ];

  constructor() {}

  public main(n: number): string {
    for (let i = 1; i <= n; i++) {
      this.result += this.getString(i);
    }
    return this.result;
  }

  public addRule(rule: Rule) {
    this.rules.push(rule);
  }

  private getString(n: number): string {
    let replacement = "";

    for (const rule of this.rules) {
      if (n % rule.multiplier === 0) {
        replacement += rule.replacement;
      }
    }

    // If no rules applied, replacement is the string value of n
    if (!replacement) {
      replacement += n.toString();
    }

    return replacement;
  }
}
