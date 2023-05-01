import { Configuration } from "../configuration";
import { UserRepositorySQLite, FleetRepositorySQLite, VehicleRepositorySQLite } from "./sqlite";
import { UserRepositoryMemory, FleetRepositoryMemory, VehicleRepositoryMemory } from "./memory";

type RespositoryKind = "memory" | "sqlite";

export class RepositoriesContainer {
  private sqliteDbFilename: string;

  constructor(private isTestDb: boolean) {
    this.sqliteDbFilename = isTestDb ? Configuration.FILE_NAMES.TEST_DB_FILE : Configuration.FILE_NAMES.PROD_DB_FILE;
  }

  async getRepositories(kind: RespositoryKind) {
    try {
      switch (kind) {
        case "memory": {
          const userRepo = new UserRepositoryMemory();
          const fleetRepo = new FleetRepositoryMemory();
          const vehicleRepo = new VehicleRepositoryMemory();

          return { userRepo, fleetRepo, vehicleRepo };
        }
        case "sqlite": {
          const userRepo = new UserRepositorySQLite(this.sqliteDbFilename);
          const fleetRepo = new FleetRepositorySQLite(this.sqliteDbFilename);
          const vehicleRepo = new VehicleRepositorySQLite(this.sqliteDbFilename);

          await Promise.all([userRepo.createTable(), fleetRepo.createTable(), vehicleRepo.createTable()]);

          return { userRepo, fleetRepo, vehicleRepo };
        }
        default: {
          throw Error(Configuration.ERROR_MESSAGES.UNKNOWN_REPOSITORY_KIND);
        }
      }
    } catch (e) {
      console.error(e);
    }
  }
}
