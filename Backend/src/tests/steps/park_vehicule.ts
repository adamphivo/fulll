import assert from "assert";
import { Given, When, Then } from "@cucumber/cucumber";
import { generate } from "../../lib/generate";
import { ParkVehiculeCommand } from "../../App/commands/parkVehiculeCommand";
import { ParkVehiculeHandler } from "../../App/handlers/parkVehiculeHandler";
import { FindUserByIdQuery } from "../../App/queries/findUserByIdQuery";
import { findUserByIdHandler } from "../../App/handlers/findUserByIdHandler";

Given("a location", function () {
  this.location = generate.location();
});

Given("my vehicle has been parked into this location", async function () {
  const command = new ParkVehiculeCommand(
    this.user,
    this.vehicule,
    this.location
  );
  const handler = new ParkVehiculeHandler(this.userRepository);
  this.parkResult = await handler.handle(command);
});

When("I try to park my vehicle at this location", async function () {
  const command = new ParkVehiculeCommand(
    this.user,
    this.vehicule,
    this.location
  );
  const handler = new ParkVehiculeHandler(this.userRepository);
  this.parkResult = await handler.handle(command);
});

When("I park my vehicle at this location", async function () {
  const command = new ParkVehiculeCommand(
    this.user,
    this.vehicule,
    this.location
  );
  const handler = new ParkVehiculeHandler(this.userRepository);
  this.parkResult = await handler.handle(command);
});

Then(
  "the known location of my vehicle should verify this location",
  async function () {
    const query = new FindUserByIdQuery(this.user.id);
    const handler = new findUserByIdHandler(this.userRepository);
    const user = await handler.handle(query);

    if (!user) {
      throw Error("User not found");
    }

    const vehicle = user.fleet.vehicules.find(
      (i) => i.plateNumber === this.vehicule.plateNumber
    );

    assert.deepStrictEqual(this.vehicule.location, vehicle?.location);
  }
);

Then(
  "I should be informed that my vehicle is already parked at this location",
  function () {
    assert.deepStrictEqual(this.parkResult, Error("Cannot park twice"));
  }
);
