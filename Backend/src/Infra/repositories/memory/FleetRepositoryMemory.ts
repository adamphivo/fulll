import { FleetRepository } from "../../../types";
import { Fleet, Vehicle } from "../../../Domain";

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

  async registerVehicle(fleetId: string, vehicle: Vehicle): Promise<Fleet> {
    this.fleets[fleetId].addVehicle(vehicle.getPlateNumber());
    return this.fleets[fleetId];
  }
}
