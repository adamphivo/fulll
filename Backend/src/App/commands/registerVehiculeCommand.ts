import { User, Vehicule } from "../../Domain";

export class RegisterVehiculeCommand {
  constructor(public user: User, public vehicule: Vehicule) {}
}
