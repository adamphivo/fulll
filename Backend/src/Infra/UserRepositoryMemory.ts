import { UserRepository } from "./UserRepository";
import { User, Vehicule } from "../Domain";
import { Location } from "../types";

export class UserRepositoryMemory implements UserRepository {
  private users: Record<string, User> = {};

  async save(user: User): Promise<void> {
    this.users[user.id] = user;
  }

  async findById(id: string): Promise<User | null> {
    const user = Object.values(this.users).find((u) => u.id === id);
    return user || null;
  }

  async registerVehicule(user: User, vehicule: Vehicule): Promise<User> {
    this.users[user.id].fleet.vehicules.push(vehicule);
    return this.users[user.id];
  }

  async parkVehicule(
    user: User,
    vehicle: Vehicule,
    location: Location
  ): Promise<User> {
    const index = this.users[user.id].fleet.vehicules.findIndex(
      (i) => i.plateNumber === vehicle.plateNumber
    );
    this.users[user.id].fleet.vehicules[index].location = location;
    return this.users[user.id];
  }
}
