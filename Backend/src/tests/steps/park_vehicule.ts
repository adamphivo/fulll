import assert from "assert";
import { Configuration } from "../../Infra/configuration";
import { Given, When, Then } from "@cucumber/cucumber";
import { generate } from "../../lib/generate";
import { ParkVehicleCommand, ParkVehicleHandler } from "../../App/vehicle/parkVehicle";

Given("a location", function () {
  this.location = generate.location();
});

Given("my vehicle has been parked into this location", async function () {
  const command = new ParkVehicleCommand(this.fleet.getId(), this.vehicle.getPlateNumber(), this.location);

  const handler = new ParkVehicleHandler(this.fleetRepository, this.vehicleRepository);

  await handler.handle(command);
});

When("I park my vehicle at this location", async function () {
  try {
    const command = new ParkVehicleCommand(this.fleet.getId(), this.vehicle.getPlateNumber(), this.location);

    const handler = new ParkVehicleHandler(this.fleetRepository, this.vehicleRepository);

    this.result = await handler.handle(command);
  } catch (e) {
    this.result = e;
  }
});

Then("the known location of my vehicle should verify this location", async function () {
  assert.deepStrictEqual(this.result.getLocation(), this.location);
});

Then("I should be informed that my vehicle is already parked at this location", function () {
  assert.deepStrictEqual(this.result, Error(Configuration.ERROR_MESSAGES.DUPLICATE_LOCATION));
});
