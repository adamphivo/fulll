import assert from "assert";
import { Given, Then, When } from "@cucumber/cucumber";

function isItFriday(day: string) {
  return day.toLowerCase() === "friday" ? "Yes" : "Nope";
}

Given("today is {string}", function (day: string) {
  this.today = day;
});

When("I ask whether it's Friday yet", function () {
  this.actualAnswer = isItFriday(this.today);
});

Then("I should be told {string}", function (expectedAnswer: string) {
  assert.strictEqual(this.actualAnswer, expectedAnswer);
});
