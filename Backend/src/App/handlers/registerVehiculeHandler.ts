import { UserRepository } from "../../Infra/UserRepository";
import { RegisterVehiculeCommand } from "../commands/registerVehiculeCommand";

export class RegisterVehiculeHandler {
  constructor(private userRepository: UserRepository) {}

  public async handle(
    command: RegisterVehiculeCommand
  ): Promise<void | string> {
    const { user, vehicule } = command;
    const result = await this.userRepository.registerVehicule(user, vehicule);
    return result;
  }
}
