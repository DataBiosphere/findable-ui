import { ErrorIcon as DeprecatedErrorIcon } from "../src/components/common/CustomIcon/components/ErrorIcon/errorIcon";
import { InProgressIcon as DeprecatedInProgressIcon } from "../src/components/common/CustomIcon/components/InProgressIcon/inProgressIcon";
import { SuccessIcon as DeprecatedSuccessIcon } from "../src/components/common/CustomIcon/components/SuccessIcon/successIcon";
import { ErrorIcon } from "../src/contracts/cc/icons/ErrorIcon/errorIcon";
import { InProgressIcon } from "../src/contracts/cc/icons/InProgressIcon/inProgressIcon";
import { SuccessIcon } from "../src/contracts/cc/icons/SuccessIcon/successIcon";

describe("Status icons' deprecated paths", () => {
  // Apps still import these from `CustomIcon`; each old export must be the same component as its `cc/icons` one.
  it.each([
    ["ErrorIcon", DeprecatedErrorIcon, ErrorIcon],
    ["InProgressIcon", DeprecatedInProgressIcon, InProgressIcon],
    ["SuccessIcon", DeprecatedSuccessIcon, SuccessIcon],
  ])("should export %s from its old path", (_, deprecated, icon) => {
    expect(deprecated).toBe(icon);
  });
});
