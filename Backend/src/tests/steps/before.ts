import { Before } from "@cucumber/cucumber";
import { clearDb } from "../../lib/clearDb";
import {
  UserRepositorySQLite,
  FleetRepositorySQLite,
  VehicleRepositorySQLite,
} from "../../Infra/repositories/sqlite";

const DB_FILE = "testDB.db";

Before(async function () {
  this.userRepository = new UserRepositorySQLite(DB_FILE);
  this.fleetRepository = new FleetRepositorySQLite(DB_FILE);
  this.vehicleRepository = new VehicleRepositorySQLite(DB_FILE);

  await Promise.all([
    this.userRepository.createTable(),
    this.fleetRepository.createTable(),
    this.vehicleRepository.createTable(),
  ]);

  await clearDb();
});
