import { VehiculeRepository } from "../types";
import { Vehicule } from "../Domain";
import type { Location } from "../types";

export class VehiculeRepositoryMemory implements VehiculeRepository {
  private vehicules: Record<string, Vehicule> = {};

  async save(vehicule: Vehicule): Promise<void> {
    this.vehicules[vehicule.getPlateNumber()] = vehicule;
  }

  async updateVehiculeLocation(vehicle: Vehicule, location: Location) {
    this.vehicules[vehicle.getPlateNumber()].setLocation(location);
  }

  async findByPlateNumber(plateNumber: string): Promise<Vehicule | null> {
    const vehicule = Object.values(this.vehicules).find(
      (u) => u.getPlateNumber() === plateNumber
    );
    return vehicule || null;
  }
}
