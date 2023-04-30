import { FleetRepository, VehicleRepository } from "../../types";
import { Vehicle, Fleet } from "../../Domain";

export class RegisterVehicleCommand {
  constructor(public fleetId: string, public vehiclePlateNumber: string) {}
}

export class RegisterVehicleHandler {
  constructor(
    private fleetRepository: FleetRepository,
    private vehicleRepository: VehicleRepository
  ) {}

  async handle(command: RegisterVehicleCommand): Promise<Fleet> {
    // We first check if the vehicle already exists
    const exist = await this.vehicleRepository.findByPlateNumber(
      command.vehiclePlateNumber
    );

    if (!exist) {
      await this.vehicleRepository.save(
        new Vehicle(command.vehiclePlateNumber)
      );
    }

    const fleet = await this.fleetRepository.findById(command.fleetId);

    if (!fleet) throw Error(`Fleet ${command.fleetId} not found !`);

    // Business rule - A fleet cannot contain the same vehicle twice
    if (fleet.getVehicles().includes(command.vehiclePlateNumber)) {
      throw Error("Duplicate vehicle");
    }

    fleet.addVehicle(command.vehiclePlateNumber);

    await this.fleetRepository.save(fleet);

    return fleet;
  }
}
