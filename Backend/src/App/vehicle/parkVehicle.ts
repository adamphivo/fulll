import { Vehicle } from "../../Domain";
import type { Location } from "../../types";
import { VehicleRepository } from "../../types";
import { FleetRepository } from "../../types";
import { Configuration } from "../../Infra/configuration";

export class ParkVehicleCommand {
  constructor(public fleetId: string, public plateNumber: string, public location: Location) {}
}

export class ParkVehicleHandler {
  constructor(private fleetRepository: FleetRepository, private vehicleRepository: VehicleRepository) {}

  async handle(command: ParkVehicleCommand): Promise<Vehicle> {
    const fleet = await this.fleetRepository.findById(command.fleetId);

    if (!fleet) {
      throw Error(Configuration.ERROR_MESSAGES.FLEET_NOT_FOUND);
    }

    const isVehicleRegistered = fleet.getVehicles().includes(command.plateNumber);

    if (!isVehicleRegistered) {
      throw Error(Configuration.ERROR_MESSAGES.VEHICLE_NOT_IN_FLEET);
    }

    const vehicle = await this.vehicleRepository.findByPlateNumber(command.plateNumber);

    if (!vehicle) {
      throw Error(Configuration.ERROR_MESSAGES.UNKNOWN_VEHICLE);
    }

    if (JSON.stringify(vehicle.getLocation()) === JSON.stringify(command.location)) {
      throw Error(Configuration.ERROR_MESSAGES.DUPLICATE_LOCATION);
    }

    vehicle.setLocation(command.location);
    await this.vehicleRepository.save(vehicle);

    return vehicle;
  }
}
