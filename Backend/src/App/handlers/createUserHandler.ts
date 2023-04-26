import { CreateUserCommand } from "../commands/createUserCommand";
import { UserRepository } from "../../Infra/UserRepository";
import { User } from "../../Domain";

export class CreateUserHandler {
  constructor(private userRepository: UserRepository) {}

  async handle(command: CreateUserCommand): Promise<User> {
    const user = command.user;
    await this.userRepository.save(user);
    return user;
  }
}
