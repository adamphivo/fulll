import { Vehicule } from "../../Domain";
import type { Location } from "../../types";
import { VehiculeRepository } from "../../types";
import { FleetRepository } from "../../types";
import { isSimilar } from "../../lib/isSimilar";

export class ParkVehiculeCommand {
  constructor(
    public fleetId: string,
    public plateNumber: string,
    public location: Location
  ) {}
}

export class ParkVehiculeHandler {
  constructor(
    private fleetRepository: FleetRepository,
    private vehiculeRepository: VehiculeRepository
  ) {}

  async handle(command: ParkVehiculeCommand): Promise<Vehicule> {
    const fleet = await this.fleetRepository.findById(command.fleetId);

    if (!fleet) throw Error("Fleet not found");

    const isVehiculeRegistered = fleet
      .getVehicules()
      .includes(command.plateNumber);

    if (!isVehiculeRegistered) {
      throw Error("Vehicule not registered in your fleet.");
    }

    const vehicule = await this.vehiculeRepository.findByPlateNumber(
      command.plateNumber
    );

    if (!vehicule) {
      throw Error("Vehicule not registered.");
    }

    if (isSimilar(vehicule.getLocation(), command.location)) {
      throw Error("Cannot register the same location.");
    }

    vehicule.setLocation(command.location);
    await this.vehiculeRepository.save(vehicule);

    return vehicule;
  }
}
