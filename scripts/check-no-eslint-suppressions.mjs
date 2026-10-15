// ESLint applies bulk suppressions from eslint-suppressions.json automatically,
// so a stray `--suppress-all` or `--suppress-rule` would silence lint errors.
// Bulk suppressions were retired with the JSDoc burn-down (#1032), so fail lint
// if the file comes back: document the code instead of suppressing it.
import { existsSync } from "node:fs";

const SUPPRESSIONS_FILE = "eslint-suppressions.json";

if (existsSync(SUPPRESSIONS_FILE)) {
  console.error(
    `${SUPPRESSIONS_FILE} found. ESLint bulk suppressions are retired (#1032): document the code instead of suppressing it, then delete the file.`,
  );
  process.exit(1);
}
