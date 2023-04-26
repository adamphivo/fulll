import { UserRepository } from "./UserRepository";
import { User, Vehicule } from "../Domain";

export class UserRepositoryMemory implements UserRepository {
  private users: Record<string, User> = {};

  async save(user: User): Promise<void> {
    this.users[user.id] = user;
  }

  async findById(id: string): Promise<User | null> {
    const user = Object.values(this.users).find((u) => u.id === id);
    return user || null;
  }

  async registerVehicule(
    user: User,
    vehicule: Vehicule
  ): Promise<void | string> {
    try {
      user.addVehicule(vehicule);
      this.users[user.id] = user;
    } catch (e) {
      if (e instanceof Error) {
        return e.message;
      }
    }
  }
}
