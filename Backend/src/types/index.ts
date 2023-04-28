import { User, Fleet, Vehicule } from "../Domain";

export interface Location {
  longitude: string;
  latitude: string;
  altitude?: string;
}

export interface FleetRepository {
  save(fleet: Fleet): Promise<void>;
  findById(fleetId: string): Promise<Fleet | null>;
  registerVehicule(fleetId: string, vehicule: Vehicule): Promise<Fleet>;
}

export interface UserRepository {
  save(user: User): Promise<void>;
  findById(id: string): Promise<User | null>;
}

export interface VehiculeRepository {
  save(vehicle: Vehicule): Promise<void>;
  findByPlateNumber(plateNumber: string): Promise<Vehicule | null>;
}
