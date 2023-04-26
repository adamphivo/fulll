import { User, Vehicule } from "../Domain";
import type { Location } from "../types";

export interface UserRepository {
  save(user: User): Promise<void>;
  findById(id: string): Promise<User | null>;
  registerVehicule(user: User, vehicule: Vehicule): Promise<User>;
  parkVehicule(
    user: User,
    vehicle: Vehicule,
    location: Location
  ): Promise<User>;
}
