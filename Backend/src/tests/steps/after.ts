import { After } from "@cucumber/cucumber";
import { Configuration } from "../../Infra/configuration";
import { unlinkSync } from "fs";

After(async function () {
  // Delete the test db file
  unlinkSync(Configuration.FILE_NAMES.TEST_DB_FILE);
});
