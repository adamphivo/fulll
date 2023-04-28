import { FleetRepository, VehiculeRepository } from "../../types";
import { Vehicule, Fleet } from "../../Domain";

export class RegisterVehiculeCommand {
  constructor(public fleetId: string, public vehiculePlateNumber: string) {}
}

export class RegisterVehiculeHandler {
  constructor(
    private fleetRepository: FleetRepository,
    private vehiculeRepository: VehiculeRepository
  ) {}

  async handle(command: RegisterVehiculeCommand): Promise<Fleet> {
    // We first check if the vehicule already exists
    const exist = await this.vehiculeRepository.findByPlateNumber(
      command.vehiculePlateNumber
    );

    if (!exist) {
      await this.vehiculeRepository.save(
        new Vehicule(command.vehiculePlateNumber)
      );
    }

    const fleet = await this.fleetRepository.findById(command.fleetId);

    if (!fleet) throw Error(`Fleet ${command.fleetId} not found !`);

    // Business rule - A fleet cannot contain the same vehicule twice
    if (fleet.getVehicules().includes(command.vehiculePlateNumber)) {
      throw Error("Duplicate vehicule");
    }

    fleet.addVehicule(command.vehiculePlateNumber);

    await this.fleetRepository.save(fleet);

    return fleet;
  }
}
