import assert from "assert";
import { Given, When, Then, Before } from "@cucumber/cucumber";
import { v4 as uuidv4 } from "uuid";
import { Vehicule, User, Fleet } from "../../Domain";
import { clearDb } from "../../lib/clearDb";
import {
  UserRepositorySQLite,
  FleetRepositorySQLite,
  VehiculeRepositorySQLite,
} from "../../Infra/db/RepositoryBase";
import {
  CreateUserCommand,
  CreateUserHandler,
} from "../../App/user/createUser";
import {
  RegisterVehiculeCommand,
  RegisterVehiculeHandler,
} from "../../App/fleet/registerVehicule";

Before(async () => {
  await clearDb();
});

Given(
  "I am an application user named {string}",
  async function (userName: string) {
    this.userRepository = new UserRepositorySQLite("./super.db");
    this.fleetRepository = new FleetRepositorySQLite("./super.db");
    this.vehiculeRepository = new VehiculeRepositorySQLite("./super.db");

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
  this.vehicule = new Vehicule(uuidv4());
});

Given("I have registered this vehicle into my fleet", async function () {
  const command = new RegisterVehiculeCommand(
    this.fleet,
    this.vehicule.getPlateNumber()
  );
  const handler = new RegisterVehiculeHandler(
    this.fleetRepository,
    this.vehiculeRepository
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
    const command = new RegisterVehiculeCommand(
      this.otherFleet,
      this.vehicule.getPlateNumber()
    );
    const handler = new RegisterVehiculeHandler(
      this.fleetRepository,
      this.vehiculeRepository
    );
    await handler.handle(command);
  }
);

When("I register this vehicle into my fleet", async function () {
  try {
    const command = new RegisterVehiculeCommand(
      this.fleet,
      this.vehicule.getPlateNumber()
    );
    const handler = new RegisterVehiculeHandler(
      this.fleetRepository,
      this.vehiculeRepository
    );
    this.result = await handler.handle(command);
  } catch (e) {
    this.result = e;
  }
});

Then("this vehicle should be part of my vehicle fleet", async function () {
  assert.deepStrictEqual(
    this.result.getVehicules().includes(this.vehicule.getPlateNumber()),
    true
  );
});

Then(
  "I should be informed that this vehicle has already been registered into my fleet",
  function () {
    assert.deepStrictEqual(this.result, Error("Duplicate vehicule"));
  }
);
