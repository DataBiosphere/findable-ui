import { Typography } from "@mui/material";
import { CSSProperties, forwardRef, JSX, ReactNode } from "react";
import { TYPOGRAPHY_PROPS } from "../../../../../../../../styles/common/mui/typography";
import { Slogan as CatchPhrase } from "./slogan.styles";

/**
 * Props for the Slogan component.
 */
export interface SloganProps {
  className?: string;
  slogan: ReactNode;
  style?: CSSProperties; // Required for Fade component. See https://mui.com/material-ui/transitions/#child-requirement.
}

/**
 * Header slogan. A string slogan renders as body text; any other slogan renders as given.
 * @param props - Component props.
 * @param props.className - Class name applied to the slogan text, when the slogan is a string.
 * @param props.slogan - Slogan content.
 * @param props.style - Style applied to the slogan container; required for the Fade transition.
 * @param ref - Ref forwarded to the slogan container element.
 * @returns The slogan.
 */
export const Slogan = forwardRef<HTMLDivElement, SloganProps>(function Slogan(
  { className, slogan, style }: SloganProps,
  ref,
): JSX.Element {
  return (
    <CatchPhrase ref={ref} style={style}>
      {typeof slogan === "string" ? (
        <Typography
          className={className}
          variant={TYPOGRAPHY_PROPS.VARIANT.BODY_400}
        >
          {slogan}
        </Typography>
      ) : (
        slogan
      )}
    </CatchPhrase>
  );
});
