import assert from "assert";
import { Given, When, Then } from "@cucumber/cucumber";
import { v4 as uuidv4 } from "uuid";
import { User, Fleet, Vehicule } from "../../Domain";
import { UserRepositoryMemory } from "../../Infra/UserRepositoryMemory";
import { CreateUserHandler } from "../../App/handlers/createUserHandler";
import { CreateUserCommand } from "../../App/commands/createUserCommand";
import { RegisterVehiculeCommand } from "../../App/commands/registerVehiculeCommand";
import { RegisterVehiculeHandler } from "../../App/handlers/registerVehiculeHandler";

Given("an application user", async function () {
  this.userRepository = new UserRepositoryMemory();
  const command = new CreateUserCommand(
    new User(uuidv4(), new Fleet(uuidv4(), []))
  );
  const handler = new CreateUserHandler(this.userRepository);
  const user = await handler.handle(command);
  this.user = user;
});

Given("my fleet", function () {
  this.fleet = this.user.fleet;
});

Given("a vehicle", function () {
  this.vehicule = new Vehicule(uuidv4());
});

Given("I have registered this vehicle into my fleet", async function () {
  const command = new RegisterVehiculeCommand(this.user, this.vehicule);
  const handler = new RegisterVehiculeHandler(this.userRepository);
  await handler.handle(command);
});

Given("the fleet of another user", async function () {
  const command = new CreateUserCommand(
    new User(uuidv4(), new Fleet(uuidv4(), []))
  );
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
  if (
    !this.registerResult.fleet.vehicules.some(
      (i: Vehicule) => i.plateNumber === this.vehicule.plateNumber
    )
  ) {
    throw Error("Vehicule not found.");
  }
});

Then(
  "I should be informed this this vehicle has already been registered into my fleet",
  function () {
    assert.deepStrictEqual(this.registerResult, Error("Duplicate vehicule"));
  }
);
