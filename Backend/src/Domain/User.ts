import { Fleet } from "./Fleet";
import { Vehicule } from "./Vehicule";

export class User {
  public id: string;
  public fleet: Fleet;

  constructor(id: string, fleet: Fleet) {
    this.id = id;
    this.fleet = fleet;
  }

  public registerVehicule(vehicule: Vehicule): User {
    this.fleet.vehicules = [...this.fleet.vehicules, vehicule];
    return this;
  }
}
