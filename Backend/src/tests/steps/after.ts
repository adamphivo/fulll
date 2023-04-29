import { After } from "@cucumber/cucumber";
import { unlinkSync } from "fs";

const DB_FILE = "testDB.db";

After(async function () {
  // Delete the test db file
  unlinkSync(DB_FILE);
});
