import { FleetRepository } from "../types";
import { Fleet, Vehicule } from "../Domain";

export class FleetRepositoryMemory implements FleetRepository {
  private fleets: Record<string, Fleet> = {};

  async save(fleet: Fleet): Promise<void> {
    this.fleets[fleet.getId()] = fleet;
  }

  async findById(fleetId: string): Promise<Fleet | null> {
    const fleet = Object.values(this.fleets).find((u) => u.getId() === fleetId);
    return fleet || null;
  }

  async findByUserId(userId: string): Promise<Fleet | null> {
    const fleet = Object.values(this.fleets).find(
      (u) => u.getUserId() === userId
    );
    return fleet || null;
  }

  async registerVehicule(fleetId: string, vehicule: Vehicule): Promise<Fleet> {
    this.fleets[fleetId].addVehicule(vehicule.getPlateNumber());
    return this.fleets[fleetId];
  }
}
