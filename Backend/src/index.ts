#!/usr/bin/env node
import commander from "commander";
import type { Location } from "./types";
import { CreateUserCommand, CreateUserHandler } from "./App/user/createUser";
import {
  ParkVehicleCommand,
  ParkVehicleHandler,
} from "./App/vehicle/parkVehicle";
import {
  RegisterVehicleCommand,
  RegisterVehicleHandler,
} from "./App/fleet/registerVehicle";
import {
  UserRepositorySQLite,
  FleetRepositorySQLite,
  VehicleRepositorySQLite,
} from "./Infra/repositories/sqlite";

async function main() {
  const DB_FILE = "prodDB.db";
  const program = new commander.Command();

  const userRepo = new UserRepositorySQLite(DB_FILE);
  const fleetRepo = new FleetRepositorySQLite(DB_FILE);
  const vehicleRepo = new VehicleRepositorySQLite(DB_FILE);

  await Promise.all([
    userRepo.createTable(),
    fleetRepo.createTable(),
    vehicleRepo.createTable(),
  ]);

  program
    .command("create <userId>")
    .description("Register the user and create an empty fleet.")
    .action(async (userId: string) => {
      try {
        const command = new CreateUserCommand(userId);
        const handler = new CreateUserHandler(userRepo, fleetRepo);
        const user = await handler.handle(command);
        console.log(user.getFleetId());
      } catch (e) {
        console.error(e);
      }
    });

  program
    .command("register-vehicle <fleetId> <vehiclePlateNumber>")
    .description("Register a specific vehicle into a fleet.")
    .action(async (fleetId: string, vehiclePlateNumber: string) => {
      try {
        const command = new RegisterVehicleCommand(fleetId, vehiclePlateNumber);
        const handler = new RegisterVehicleHandler(fleetRepo, vehicleRepo);
        const fleet = await handler.handle(command);
        console.log(`Vehicule registered into fleet ${fleet.getId()}`);
      } catch (e) {
        console.error(e);
      }
    });

  program
    .command(
      "localize-vehicle <fleetId> <vehiclePlateNumber> <lat> <lng> [alt]"
    )
    .description("Register a specific vehicle into a fleet.")
    .action(
      async (
        fleetId: string,
        vehiclePlateNumber: string,
        lat: string,
        lng: string,
        alt: string
      ) => {
        try {
          const location: Location = {
            latitude: lat,
            longitude: lng,
            altitude: alt,
          };

          const command = new ParkVehicleCommand(
            fleetId,
            vehiclePlateNumber,
            location
          );

          const handler = new ParkVehicleHandler(fleetRepo, vehicleRepo);
          await handler.handle(command);
          console.log("Vehicule localized !");
        } catch (e) {
          console.error(e);
        }
      }
    );

  program.parse(process.argv);
}

main();
