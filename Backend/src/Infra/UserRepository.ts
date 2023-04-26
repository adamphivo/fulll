import { User, Vehicule } from "../Domain";

export interface UserRepository {
  save(user: User): Promise<void>;
  findById(id: string): Promise<User | null>;
  registerVehicule(user: User, vehicule: Vehicule): Promise<void | string>;
}
