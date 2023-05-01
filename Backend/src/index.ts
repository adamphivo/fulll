#!/usr/bin/env node
import commander from "commander";
import chalk from "chalk";
import type { Location } from "./types";
import { CreateUserCommand, CreateUserHandler } from "./App/user/createUser";
import { ParkVehicleCommand, ParkVehicleHandler } from "./App/vehicle/parkVehicle";
import { RegisterVehicleCommand, RegisterVehicleHandler } from "./App/fleet/registerVehicle";
import { RepositoriesContainer } from "./Infra/repositories/container";
import { Configuration } from "./Infra/configuration";

async function main() {
  // Init program
  const program = new commander.Command();

  // Get repositories
  const container = new RepositoriesContainer(false);
  const repositories = await container.getRepositories("sqlite");
  if (!repositories) {
    throw Error(Configuration.ERROR_MESSAGES.FAILED_REPOSITORIES_CREATION);
  }
  const { userRepo, fleetRepo, vehicleRepo } = repositories;

  // Program actions
  program
    .command("create <userId>")
    .description("Register the user and create an empty fleet.")
    .action(async (userId: string) => {
      try {
        const command = new CreateUserCommand(userId);
        const handler = new CreateUserHandler(userRepo, fleetRepo);
        const user = await handler.handle(command);
        console.log(chalk.green.bold(user.getFleetId()));
      } catch (e) {
        console.error(chalk.red.bold(e));
      }
    });

  program
    .command("register-vehicle <fleetId> <vehiclePlateNumber>")
    .description("Register a specific vehicle into a fleet.")
    .action(async (fleetId: string, vehiclePlateNumber: string) => {
      try {
        const command = new RegisterVehicleCommand(fleetId, vehiclePlateNumber);
        const handler = new RegisterVehicleHandler(fleetRepo, vehicleRepo);
        await handler.handle(command);
        console.log(chalk.green.bold(Configuration.SUCCESS_MESSAGES.REGISTERED_VEHICULE));
      } catch (e) {
        console.error(chalk.red.bold(e));
      }
    });

  program
    .command("localize-vehicle <fleetId> <vehiclePlateNumber> <lat> <lng> [alt]")
    .description("Register a specific vehicle into a fleet.")
    .action(async (fleetId: string, vehiclePlateNumber: string, lat: string, lng: string, alt: string) => {
      try {
        // Remove the nescessary "/" char to use "-" in command
        const formatedLat = lat.replace("/", "");
        const formatedLng = lng.replace("/", "");
        const formatedAlt = alt?.replace("/", "");

        const location: Location = {
          latitude: formatedLat,
          longitude: formatedLng,
          altitude: formatedAlt,
        };

        const command = new ParkVehicleCommand(fleetId, vehiclePlateNumber, location);

        const handler = new ParkVehicleHandler(fleetRepo, vehicleRepo);
        await handler.handle(command);
        console.log(chalk.green.bold(Configuration.SUCCESS_MESSAGES.LOCALIZED_VEHICLE));
        console.log(chalk.blue.bold(`➡️ https://www.google.com/maps?q=${formatedLat},${formatedLng}`));
      } catch (e) {
        console.error(chalk.red.bold(e));
      }
    });

  program.parse(process.argv);
}

main();
