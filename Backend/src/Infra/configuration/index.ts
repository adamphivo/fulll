export class Configuration {
  static ERROR_MESSAGES = {
    UNKNOWN_REPOSITORY_KIND: "Unknown repository kind ❌",
    FAILED_REPOSITORIES_CREATION: "Failed to create repositories ❌",
    DUPLICATE_LOCATION: "Vehicule already localized at this location ❌",
    DUPLICATE_VEHICLE: "Duplicate vehicle ❌",
    FLEET_NOT_FOUND: "Fleet not found ❌",
    VEHICLE_NOT_IN_FLEET: "Vehicule not registered in this fleet ❌",
    UNKNOWN_VEHICLE: "Unknown vehicle ❌",
    DUPLICATE_USER: "User already registered ❌",
    USER_HAS_NO_FLEET: "No fleet attached to this user ❌",
  };
  static SUCCESS_MESSAGES = {
    REGISTERED_VEHICULE: "Vehicle registered 🚗",
    LOCALIZED_VEHICLE: "Vehicle localized 🌎",
  };
  static FILE_NAMES = {
    PROD_DB_FILE: "prodDB.db",
    TEST_DB_FILE: "testDB.db",
  };
}
