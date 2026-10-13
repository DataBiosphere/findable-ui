import { JSX, ReactElement } from "react";
import { Tooltip } from "./components/Tooltip/tooltip";

/**
 * Props for the NTag component.
 */
export interface NTagProps {
  className?: string;
  Tag: ReactElement;
  TooltipTitle: ReactElement;
}

/**
 * NTag, rendering the tag with a tooltip of the given title.
 * @param props - Component props.
 * @param props.className - Class name applied to the tooltip.
 * @param props.Tag - Tag element; must be able to hold a ref.
 * @param props.TooltipTitle - Tooltip title.
 * @returns The tag with its tooltip.
 */
export const NTag = ({
  className,
  Tag,
  TooltipTitle,
  ...props /* Spread props to allow for Mui Tooltip specific prop overrides. */
}: NTagProps): JSX.Element => {
  return (
    <Tooltip className={className} title={TooltipTitle} {...props}>
      {Tag}
    </Tooltip>
  );
};
