import assert from "assert";
import { Given, When, Then } from "@cucumber/cucumber";
import { v4 as uuidv4 } from "uuid";
import { Vehicle } from "../../Domain";
import { GetFleetQuery, GetFleetHandler } from "../../App/fleet/getFleet";
import {
  CreateUserCommand,
  CreateUserHandler,
} from "../../App/user/createUser";
import {
  RegisterVehicleCommand,
  RegisterVehicleHandler,
} from "../../App/fleet/registerVehicle";

Given(
  "I am an application user named {string}",
  async function (userName: string) {
    const command = new CreateUserCommand(userName);
    const handler = new CreateUserHandler(
      this.userRepository,
      this.fleetRepository
    );
    const user = await handler.handle(command);
    this.user = user;
  }
);

Given("my fleet", async function () {
  const query = new GetFleetQuery(this.user.getId());
  const handler = new GetFleetHandler(this.fleetRepository);
  const fleet = await handler.handle(query);
  this.fleet = fleet;
});

Given("a vehicle", function () {
  this.vehicle = new Vehicle(uuidv4());
});

Given("I have registered this vehicle into my fleet", async function () {
  const command = new RegisterVehicleCommand(
    this.fleet.getId(),
    this.vehicle.getPlateNumber()
  );
  const handler = new RegisterVehicleHandler(
    this.fleetRepository,
    this.vehicleRepository
  );
  await handler.handle(command);
});

Given(
  "the fleet of another user named {string}",
  async function (userName: string) {
    // Create other user
    const command = new CreateUserCommand(userName);
    const handler = new CreateUserHandler(
      this.userRepository,
      this.fleetRepository
    );
    const user = await handler.handle(command);
    this.otherUser = user;

    // Get his/her fleet
    const query = new GetFleetQuery(this.otherUser.getId());
    const findHandler = new GetFleetHandler(this.fleetRepository);
    const fleet = await findHandler.handle(query);
    this.otherFleet = fleet;
  }
);

Given(
  "this vehicle has been registered into the other user's fleet",
  async function () {
    const command = new RegisterVehicleCommand(
      this.otherFleet.getId(),
      this.vehicle.getPlateNumber()
    );
    const handler = new RegisterVehicleHandler(
      this.fleetRepository,
      this.vehicleRepository
    );
    await handler.handle(command);
  }
);

When("I register this vehicle into my fleet", async function () {
  try {
    const command = new RegisterVehicleCommand(
      this.fleet.getId(),
      this.vehicle.getPlateNumber()
    );
    const handler = new RegisterVehicleHandler(
      this.fleetRepository,
      this.vehicleRepository
    );
    this.result = await handler.handle(command);
  } catch (e) {
    this.result = e;
  }
});

Then("this vehicle should be part of my vehicle fleet", function () {
  assert.deepStrictEqual(
    this.result.getVehicles().includes(this.vehicle.getPlateNumber()),
    true
  );
});

Then(
  "I should be informed that this vehicle has already been registered into my fleet",
  function () {
    assert.deepStrictEqual(this.result, Error("Duplicate vehicle"));
  }
);
