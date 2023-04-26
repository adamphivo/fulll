import { User, Vehicule } from "../../Domain";

interface Location {
  longitude: string;
  latitude: string;
}

export class ParkVehiculeCommand {
  constructor(
    public user: User,
    public vehicule: Vehicule,
    public location: Location
  ) {}
}
