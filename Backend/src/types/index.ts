export interface Vehicule {
  vehiculePlateNumber: string;
  location: Location;
}

export interface User {
  id: string;
  fleets: Fleet[];
}

export interface Fleet {
  id: string;
  vehicules: Vehicule[];
}

export interface Location {
  longitude: string;
  latitude: string;
  altitude?: string;
}
