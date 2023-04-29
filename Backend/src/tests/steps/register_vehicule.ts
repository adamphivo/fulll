import assert from "assert";
import { Given, When, Then, Before, BeforeAll } from "@cucumber/cucumber";
import { v4 as uuidv4 } from "uuid";
import { Vehicle } from "../../Domain";
import { clearDb } from "../../lib/clearDb";
import {
  UserRepositorySQLite,
  FleetRepositorySQLite,
  VehicleRepositorySQLite,
} from "../../Infra/repositories/sqlite";
import {
  CreateUserCommand,
  CreateUserHandler,
} from "../../App/user/createUser";
import {
  RegisterVehicleCommand,
  RegisterVehicleHandler,
} from "../../App/fleet/registerVehicle";

const DB_FILE = "testDB.db";

Before(async function () {
  await clearDb();
  this.userRepository = new UserRepositorySQLite(DB_FILE);
  this.fleetRepository = new FleetRepositorySQLite(DB_FILE);
  this.vehicleRepository = new VehicleRepositorySQLite(DB_FILE);

  await Promise.all([
    this.userRepository.createTable(),
    this.fleetRepository.createTable(),
    this.vehicleRepository.createTable(),
  ]);
});

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

Given("my fleet", function () {
  this.fleet = this.user.getFleetId();
});

Given("a vehicle", function () {
  this.vehicle = new Vehicle(uuidv4());
});

Given("I have registered this vehicle into my fleet", async function () {
  const command = new RegisterVehicleCommand(
    this.fleet,
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
    const command = new CreateUserCommand(userName);
    const handler = new CreateUserHandler(
      this.userRepository,
      this.fleetRepository
    );
    const user = await handler.handle(command);
    this.otherUser = user;
    this.otherFleet = this.otherUser.getFleetId();
  }
);

Given(
  "this vehicle has been registered into the other user's fleet",
  async function () {
    const command = new RegisterVehicleCommand(
      this.otherFleet,
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
      this.fleet,
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

Then("this vehicle should be part of my vehicle fleet", async function () {
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
