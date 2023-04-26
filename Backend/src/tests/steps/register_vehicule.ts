import assert from "assert";
import { Given, When, Then } from "@cucumber/cucumber";
import { User, Fleet, Vehicule } from "../../Domain";
import { UserRepositoryMemory } from "../../Infra/UserRepositoryMemory";
import { CreateUserHandler } from "../../App/handlers/createUserHandler";
import { CreateUserCommand } from "../../App/commands/createUserCommand";
import { RegisterVehiculeCommand } from "../../App/commands/registerVehiculeCommand";
import { RegisterVehiculeHandler } from "../../App/handlers/registerVehiculeHandler";
import { FindUserByIdQuery } from "../../App/queries/findUserByIdQuery";
import { findUserByIdHandler } from "../../App/handlers/findUserByIdHandler";

Given("an application user", async function () {
  this.userRepository = new UserRepositoryMemory();
  const command = new CreateUserCommand(new User("1", new Fleet("1", [])));
  const handler = new CreateUserHandler(this.userRepository);
  const user = await handler.handle(command);
  this.user = user;
});

Given("my fleet", function () {
  this.fleet = this.user.fleet;
});

Given("a vehicle", function () {
  this.vehicule = new Vehicule("123456789");
});

Given("I have registered this vehicle into my fleet", async function () {
  const command = new RegisterVehiculeCommand(this.user, this.vehicule);
  const handler = new RegisterVehiculeHandler(this.userRepository);
  await handler.handle(command);
});

Given("the fleet of another user", async function () {
  const command = new CreateUserCommand(new User("2", new Fleet("2", [])));
  const handler = new CreateUserHandler(this.userRepository);
  const user = await handler.handle(command);
  this.otherUser = user;
  this.otherFleet = this.otherUser.fleet;
});

Given(
  "this vehicle has been registered into the other user's fleet",
  async function () {
    const command = new RegisterVehiculeCommand(this.otherUser, this.vehicule);
    const handler = new RegisterVehiculeHandler(this.userRepository);
    await handler.handle(command);
  }
);

When("I register this vehicle into my fleet", async function () {
  const command = new RegisterVehiculeCommand(this.user, this.vehicule);
  const handler = new RegisterVehiculeHandler(this.userRepository);
  this.registerResult = await handler.handle(command);
});

Then("this vehicle should be part of my vehicle fleet", async function () {
  const query = new FindUserByIdQuery(this.user.id);
  const handler = new findUserByIdHandler(this.userRepository);
  const user = await handler.handle(query);

  if (!user) {
    throw Error("User not found.");
  }

  const isPartOfFleet = user.fleet.vehicules.some(
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
