import assert from "assert";
import { Given, When, Then } from "@cucumber/cucumber";
import { add } from "../../lib/add";

Given("My numbers are {int} and {int}", function (a: number, b: number) {
  this.a = a;
  this.b = b;
});

When("I ask what is the sum", function () {
  this.actualAnswer = add(this.a, this.b);
});

Then("I should be told {int}", function (expectedAnswer: number) {
  assert.strictEqual(this.actualAnswer, expectedAnswer);
});
