import { User } from "../../Domain";
import { UserRepository } from "../../Infra/UserRepository";
import { FindUserByIdQuery } from "../queries/findUserByIdQuery";

export class findUserByIdHandler {
  constructor(private userRepository: UserRepository) {}

  async handle(query: FindUserByIdQuery): Promise<User | null> {
    return await this.userRepository.findById(query.id);
  }
}
