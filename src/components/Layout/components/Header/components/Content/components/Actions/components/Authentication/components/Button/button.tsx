import { LoginRounded } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { usePathname } from "next/navigation";
import { JSX } from "react";
import { BUTTON_PROPS } from "../../../../../../../../../../../../styles/common/mui/button";
import { ICON_BUTTON_PROPS } from "../../../../../../../../../../../../styles/common/mui/iconButton";
import { isNavigationLinkSelected } from "../../../../../Navigation/common/utils";
import { ARIA_LABEL } from "../../constants";
import { getSignInPathPattern } from "../../utils";
import { StyledButton } from "./button.styles";
import type { ButtonProps } from "./types";

/**
 * Renders the sign-in button, as either the icon or the labelled variant.
 * The variant switch and the active-state wiring live here rather than in a
 * caller-supplied render prop: a prop holding a component type is a remount
 * hazard, because an inline arrow is a new type on every render.
 * @param props - Component props.
 * @param props.isMenuIn - Renders the icon button variant.
 * @param props.onClick - Starts the sign-in navigation.
 * @param props.signInPath - Resolved sign-in path, used to highlight the button.
 * @returns The sign-in button.
 */
export const Button = ({
  isMenuIn,
  onClick,
  signInPath,
}: ButtonProps): JSX.Element => {
  const pathname = usePathname() ?? "";
  return isMenuIn ? (
    <IconButton
      aria-label={ARIA_LABEL.SIGN_IN}
      color={ICON_BUTTON_PROPS.COLOR.INK}
      onClick={onClick}
    >
      <LoginRounded />
    </IconButton>
  ) : (
    <StyledButton
      onClick={onClick}
      startIcon={<LoginRounded />}
      variant={
        isNavigationLinkSelected(pathname, [getSignInPathPattern(signInPath)])
          ? BUTTON_PROPS.VARIANT.ACTIVE_NAV
          : BUTTON_PROPS.VARIANT.NAV
      }
    >
      Sign in
    </StyledButton>
  );
};
