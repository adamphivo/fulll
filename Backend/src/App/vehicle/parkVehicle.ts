import { Vehicle } from "../../Domain";
import type { Location } from "../../types";
import { VehicleRepository } from "../../types";
import { FleetRepository } from "../../types";

export class ParkVehicleCommand {
  constructor(
    public fleetId: string,
    public plateNumber: string,
    public location: Location
  ) {}
}

export class ParkVehicleHandler {
  constructor(
    private fleetRepository: FleetRepository,
    private vehicleRepository: VehicleRepository
  ) {}

  async handle(command: ParkVehicleCommand): Promise<Vehicle> {
    const fleet = await this.fleetRepository.findById(command.fleetId);

    if (!fleet) throw Error("Fleet not found");

    const isVehicleRegistered = fleet
      .getVehicles()
      .includes(command.plateNumber);

    if (!isVehicleRegistered) {
      throw Error("Vehicle not registered in your fleet.");
    }

    const vehicle = await this.vehicleRepository.findByPlateNumber(
      command.plateNumber
    );

    if (!vehicle) {
      throw Error("Vehicle not registered.");
    }

    if (
      JSON.stringify(vehicle.getLocation()) === JSON.stringify(command.location)
    ) {
      throw Error("Cannot register the same location.");
    }

    vehicle.setLocation(command.location);
    await this.vehicleRepository.save(vehicle);

    return vehicle;
  }
}
