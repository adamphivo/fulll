import { Fleet } from "./Fleet";
import { Vehicule } from "./Vehicule";

export class User {
  public id: string;
  public fleet: Fleet;

  constructor(id: string, fleet: Fleet) {
    this.id = id;
    this.fleet = fleet;
  }

  public addVehicule(vehicule: Vehicule): User | string {
    const isAlreadyRegistered = this.fleet.vehicules.some(
      (i) => i.plateNumber === vehicule.plateNumber
    );

    if (!isAlreadyRegistered) {
      this.fleet.vehicules = [...this.fleet.vehicules, vehicule];
      return this;
    } else {
      throw Error(Fleet.ALREADY_REGISTERED_MESSAGE);
    }
  }
}
