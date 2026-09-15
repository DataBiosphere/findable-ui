import { resolveAriaLabel } from "../../../../../../../../../../../../utils/ariaLabel";
import { ARIA_LABEL } from "./constants";

/**
 * Returns the accessible name for the account menu button, naming the signed-in
 * user when known. The button cannot rely on the avatar to contribute the name:
 * MUI `Avatar` renders an `<img alt>` only when `src` loads, and an `aria-label`
 * on the button would suppress that text in any case.
 * @param name - Name of the signed-in user.
 * @returns The account menu button's accessible name.
 */
export function getAccountMenuLabel(name: string): string {
  const userName = name?.trim();
  return resolveAriaLabel(
    userName && `${ARIA_LABEL.ACCOUNT_MENU} for ${userName}`,
    ARIA_LABEL.ACCOUNT_MENU,
  );
}
