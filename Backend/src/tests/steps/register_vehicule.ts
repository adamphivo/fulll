import assert from "assert";
import { Given, When, Then } from "@cucumber/cucumber";
import { User, Fleet, Vehicule } from "../../Domain";

Given("an application user", function () {
  this.user = new User("1", new Fleet("1", []));
});

Given("my fleet", function () {
  this.fleet = this.user.fleet;
});

Given("a vehicle", function () {
  this.vehicule = new Vehicule("123456789");
});

Given("I have registered this vehicle into my fleet", function () {
  this.user.addVehicule(this.vehicule);
});

Given("the fleet of another user", function () {
  this.otherUser = new User("2", new Fleet("2", []));
  this.otherFleet = this.otherUser.fleet;
});

Given(
  "this vehicle has been registered into the other user's fleet",
  function () {
    this.otherUser.addVehicule(this.vehicule);
  }
);

When("I register this vehicle into my fleet", function () {
  this.registerResult = this.user.addVehicule(this.vehicule);
});

Then("this vehicle should be part of my vehicle fleet", function () {
  const isPartOfFleet = this.fleet.vehicules.some(
    (i: Vehicule) => i.plateNumber === this.vehicule.plateNumber
  );

  if (!isPartOfFleet) {
    throw Error("Vehicule not added.");
  }
});

Then(
  "I should be informed this this vehicle has already been registered into my fleet",
  function () {
    assert.strictEqual(this.registerResult, Fleet.ALREADY_REGISTERED_MESSAGE);
  }
);
