import { ParkVehiculeCommand } from "../commands/parkVehiculeCommand";
import { UserRepository } from "../../Infra/UserRepository";
import { User } from "../../Domain";

export class ParkVehiculeHandler {
  constructor(private userRepository: UserRepository) {}

  async handle(command: ParkVehiculeCommand): Promise<User | Error> {
    // Business rule - Cant park same vehicule twice
    if (
      command.user.fleet.vehicules.find((i) => i.location == command.location)
    ) {
      return Error("Cannot park twice");
    }

    const user = await this.userRepository.parkVehicule(
      command.user,
      command.vehicule,
      command.location
    );

    return user;
  }
}
