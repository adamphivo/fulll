import { User, Fleet, Vehicle } from "../Domain";

export interface Location {
  longitude: string;
  latitude: string;
  altitude: string | undefined;
}

export interface FleetRepository {
  save(fleet: Fleet): Promise<void>;
  findById(fleetId: string): Promise<Fleet | null>;
  registerVehicle(fleetId: string, vehicle: Vehicle): Promise<Fleet>;
}

export interface UserRepository {
  save(user: User): Promise<void>;
  findById(id: string): Promise<User | null>;
}

export interface VehicleRepository {
  save(vehicle: Vehicle): Promise<void>;
  findByPlateNumber(plateNumber: string): Promise<Vehicle | null>;
}
