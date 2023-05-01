import { Before } from "@cucumber/cucumber";
import { clearDb } from "../../lib/clearDb";
import { Configuration } from "../../Infra/configuration";
import { RepositoriesContainer } from "../../Infra/repositories/container";

Before(async function () {
  const container = new RepositoriesContainer(true);
  const repositories = await container.getRepositories("sqlite");

  if (!repositories) {
    throw Error(Configuration.ERROR_MESSAGES.FAILED_REPOSITORIES_CREATION);
  }

  this.userRepository = repositories.userRepo;
  this.fleetRepository = repositories.fleetRepo;
  this.vehicleRepository = repositories.vehicleRepo;

  await clearDb();
});
