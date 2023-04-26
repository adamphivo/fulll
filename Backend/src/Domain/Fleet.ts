import { Vehicule } from "./Vehicule";

export class Fleet {
  static ALREADY_REGISTERED_MESSAGE: string = "Vehicule already added.";
  public id: string;
  public vehicules: Vehicule[];

  constructor(id: string, vehicules: Vehicule[]) {
    this.id = id;
    this.vehicules = vehicules;
  }
}
