import { Vehicule } from "./Vehicule";

export class Fleet {
  id: string;
  vehicules: Vehicule[];
  static ALREADY_REGISTER_MESSAGE: string = "Vehicule already added.";

  constructor(id: string, vehicules: Vehicule[]) {
    this.id = id;
    this.vehicules = vehicules;
  }

  addVehicule(vehicule: Vehicule) {
    if (!this.vehicules.includes(vehicule)) {
      this.vehicules = [...this.vehicules, vehicule];
    } else {
      return Fleet.ALREADY_REGISTER_MESSAGE;
    }
  }
}
