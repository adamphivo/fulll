import { v4 as uuidv4 } from "uuid";
import { User, Fleet } from "../../Domain";
import { FleetRepository } from "../../types";
import { UserRepository } from "../../types";

export class CreateUserCommand {
  constructor(public id: string) {}
}

export class CreateUserHandler {
  constructor(
    private userRepository: UserRepository,
    private fleetRepository: FleetRepository
  ) {}

  async handle(command: CreateUserCommand): Promise<User> {
    // We make sure the user is not already registered
    const exist = await this.userRepository.findById(command.id);
    if (exist) {
      throw Error("User already registered");
    }
    // We create an empty fleet during the user creation
    const emptyFleet = new Fleet(uuidv4(), command.id, []);
    await this.fleetRepository.save(emptyFleet);

    // We can then create the user and save it
    const user = new User(command.id, emptyFleet.getId());
    await this.userRepository.save(user);

    return user;
  }
}
