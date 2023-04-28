import { UserRepository } from "../types";
import { User } from "../Domain";

export class UserRepositoryMemory implements UserRepository {
  private users: Record<string, User> = {};

  async save(user: User): Promise<void> {
    this.users[user.getId()] = user;
  }

  async findById(id: string): Promise<User | null> {
    const user = Object.values(this.users).find((u) => u.getId() === id);
    return user || null;
  }
}
