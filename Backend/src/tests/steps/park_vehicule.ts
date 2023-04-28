import assert from "assert";
import { Given, When, Then } from "@cucumber/cucumber";
import { generate } from "../../lib/generate";
import {
  ParkVehiculeCommand,
  ParkVehiculeHandler,
} from "../../App/vehicule/parkVehicule";

Given("a location", function () {
  this.location = generate.location();
});

Given("my vehicle has been parked into this location", async function () {
  const command = new ParkVehiculeCommand(
    this.fleet,
    this.vehicule.getPlateNumber(),
    this.location
  );

  const handler = new ParkVehiculeHandler(
    this.fleetRepository,
    this.vehiculeRepository
  );

  await handler.handle(command);
});

When("I park my vehicle at this location", async function () {
  try {
    const command = new ParkVehiculeCommand(
      this.fleet,
      this.vehicule.getPlateNumber(),
      this.location
    );

    const handler = new ParkVehiculeHandler(
      this.fleetRepository,
      this.vehiculeRepository
    );

    this.result = await handler.handle(command);
  } catch (e) {
    this.result = e;
  }
});

Then(
  "the known location of my vehicle should verify this location",
  async function () {
    assert.deepStrictEqual(this.result.getLocation(), this.location);
  }
);

Then(
  "I should be informed that my vehicle is already parked at this location",
  function () {
    assert.deepStrictEqual(
      this.result,
      Error("Cannot register the same location.")
    );
  }
);
