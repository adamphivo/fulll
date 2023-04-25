export interface User {
  id: string;
  name: string;
  email: string;
  fleets: Fleet[];
}

export interface Fleet {
  id: string;
  userId: string;
  name: string;
  vehicules: Vehicule[];
}

export interface Vehicule {
  plateNumber: string;
  location: Location;
}

export interface Location {
  longitude: string;
  latitude: string;
  altitude?: string;
}
