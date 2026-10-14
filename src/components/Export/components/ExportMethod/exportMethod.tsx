import { ChevronRightRounded } from "@mui/icons-material";
import {
  CardActionArea,
  CardActions,
  CardContent,
  Chip,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { JSX, ReactNode } from "react";
import { useDownloadStatus } from "../../../../hooks/useDownloadStatus";
import { STACK_PROPS } from "../../../../styles/common/mui/stack";
import { SVG_ICON_PROPS } from "../../../../styles/common/mui/svgIcon";
import { TYPOGRAPHY_PROPS } from "../../../../styles/common/mui/typography";
import { FluidPaper } from "../../../common/Paper/components/FluidPaper/fluidPaper";
import { TrackingProps } from "../../../types";
import { CHIP_PROPS } from "./constants";
import { StyledCard } from "./exportMethod.styles";

/**
 * Props for the ExportMethod component.
 */
export interface ExportMethodProps extends TrackingProps {
  comingSoon?: boolean;
  description: ReactNode;
  footnote?: ReactNode;
  icon?: ReactNode;
  isAccessible?: boolean;
  route: string;
  title: string;
}

/**
 * Export method card linking to the method's route. Disabled when the method is
 * coming soon, while downloads are disabled during indexing (with a tooltip
 * saying so) or when the method is not accessible.
 * @param props - Component props.
 * @param props.comingSoon - Whether the method is coming soon; shows a chip in place of the arrow.
 * @param props.description - Card description.
 * @param props.footnote - Footnote rendered below the description.
 * @param props.icon - Icon rendered before the title.
 * @param props.isAccessible - Whether the user can access the method; defaults to true.
 * @param props.route - Route the card links to.
 * @param props.title - Card title, also the link's accessible name.
 * @param props.trackingId - Id set on the link, for analytics tracking.
 * @returns The export method card.
 */
export const ExportMethod = ({
  comingSoon,
  description,
  footnote,
  icon,
  isAccessible = true,
  route,
  title,
  trackingId,
}: ExportMethodProps): JSX.Element => {
  const { disabled: downloadStatusDisabled, message } = useDownloadStatus();
  const disabled = comingSoon || downloadStatusDisabled || !isAccessible;
  return (
    <Tooltip arrow title={message}>
      <StyledCard component={FluidPaper} disabled={disabled} elevation={1}>
        <CardActionArea
          aria-label={title}
          component={Link}
          disabled={disabled}
          href={route}
          id={trackingId}
        />
        <CardContent>
          <Stack
            alignItems={STACK_PROPS.ALIGN_ITEMS.FLEX_START}
            direction={STACK_PROPS.DIRECTION.ROW}
            gap={2}
            useFlexGap
          >
            {icon}
            <Typography
              component="h3"
              variant={TYPOGRAPHY_PROPS.VARIANT.HEADING_XSMALL}
            >
              {title}
            </Typography>
          </Stack>
          <Typography
            component="div"
            variant={TYPOGRAPHY_PROPS.VARIANT.BODY_400_2_LINES}
          >
            {description}
          </Typography>
          {footnote && (
            <Typography
              color={TYPOGRAPHY_PROPS.COLOR.INK_LIGHT}
              component="div"
              variant={TYPOGRAPHY_PROPS.VARIANT.BODY_SMALL_400_2_LINES}
            >
              {footnote}
            </Typography>
          )}
        </CardContent>
        <CardActions>
          {comingSoon ? (
            <Chip {...CHIP_PROPS} />
          ) : (
            <ChevronRightRounded color={SVG_ICON_PROPS.COLOR.INK_LIGHT} />
          )}
        </CardActions>
      </StyledCard>
    </Tooltip>
  );
};
