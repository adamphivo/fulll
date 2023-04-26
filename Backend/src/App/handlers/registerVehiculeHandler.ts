import { User } from "../../Domain";
import { UserRepository } from "../../Infra/UserRepository";
import { RegisterVehiculeCommand } from "../commands/registerVehiculeCommand";

export class RegisterVehiculeHandler {
  constructor(private userRepository: UserRepository) {}

  public async handle(command: RegisterVehiculeCommand): Promise<User | Error> {
    const { user, vehicule } = command;

    // Business rule - A vehicule cannot be registered twice
    if (
      user.fleet.vehicules.some((i) => i.plateNumber === vehicule.plateNumber)
    ) {
      return Error("Duplicate vehicule");
    }

    return await this.userRepository.registerVehicule(user, vehicule);
  }
}
