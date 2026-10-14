import { ListItemTextProps } from "@mui/material";
import { JSX } from "react";
import { isValueString } from "../../../../../../../utils/typeGuards";
import { BaseComponentProps } from "../../../../../../types";
import { Count } from "./components/Count/count";
import { Term } from "./components/Term/term";
import { StyledListItemText } from "./listItemText.styles";

/**
 * Select list item text, rendering a string primary as a term and a string secondary as a count; other content is rendered as is.
 * The given Mui ListItemText props override the defaults.
 * @param props - Component props.
 * @param props.className - Class name applied to the text.
 * @param props.primary - Primary content.
 * @param props.secondary - Secondary content.
 * @returns The list item text.
 */
export const ListItemText = ({
  className,
  primary,
  secondary,
  ...props /* MuiListItemTextProps */
}: BaseComponentProps & ListItemTextProps): JSX.Element => {
  return (
    <StyledListItemText
      className={className}
      disableTypography
      primary={renderPrimary(primary)}
      secondary={renderSecondary(secondary)}
      {...props}
    />
  );
};

/**
 * Render the primary prop for the ListItemText component.
 * Default fallback for "string" values is <Term> component.
 * @param primary - Primary prop.
 * @returns primary prop.
 */
function renderPrimary(
  primary: ListItemTextProps["primary"],
): ListItemTextProps["primary"] {
  return isValueString(primary) ? <Term>{primary}</Term> : primary;
}

/**
 * Render the secondary prop for the ListItemText component.
 * Default fallback for "string" values is <Count> component.
 * @param secondary - Secondary prop.
 * @returns secondary prop.
 */
function renderSecondary(
  secondary: ListItemTextProps["secondary"],
): ListItemTextProps["secondary"] {
  return isValueString(secondary) ? <Count>{secondary}</Count> : secondary;
}
