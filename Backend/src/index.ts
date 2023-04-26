import { User, Fleet, Vehicule } from "./Domain";

const user = new User("1", new Fleet("2", []));
user.addVehicule(new Vehicule("fdfdf"));
user.addVehicule(new Vehicule("fdfdf"));
