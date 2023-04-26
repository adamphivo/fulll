import { User } from "../../Domain";

export class CreateUserCommand {
  constructor(public user: User) {}
}
