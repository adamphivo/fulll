import { VehicleRepository } from "../../../types";
import { Vehicle } from "../../../Domain";
import type { Location } from "../../../types";

export class VehicleRepositoryMemory implements VehicleRepository {
  private vehicles: Record<string, Vehicle> = {};

  async save(vehicle: Vehicle): Promise<void> {
    this.vehicles[vehicle.getPlateNumber()] = vehicle;
  }

  async updateVehicleLocation(vehicle: Vehicle, location: Location) {
    this.vehicles[vehicle.getPlateNumber()].setLocation(location);
  }

  async findByPlateNumber(plateNumber: string): Promise<Vehicle | null> {
    const vehicle = Object.values(this.vehicles).find(
      (u) => u.getPlateNumber() === plateNumber
    );
    return vehicle || null;
  }
}
