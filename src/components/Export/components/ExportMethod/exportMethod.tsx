import { ChevronRightRounded } from "@mui/icons-material";
import {
  CardActionArea,
  CardActions,
  CardContent,
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
import { StyledCard } from "./exportMethod.styles";

export interface ExportMethodProps extends TrackingProps {
  description: ReactNode;
  footnote?: ReactNode;
  icon?: ReactNode;
  isAccessible?: boolean;
  route: string;
  title: string;
}

export const ExportMethod = ({
  description,
  footnote,
  icon,
  isAccessible = true,
  route,
  title,
  trackingId,
}: ExportMethodProps): JSX.Element => {
  const { disabled, message } = useDownloadStatus();
  return (
    <Tooltip arrow title={message}>
      <StyledCard component={FluidPaper} elevation={1}>
        <CardActionArea
          aria-label={title}
          component={Link}
          disabled={disabled || !isAccessible}
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
          <ChevronRightRounded color={SVG_ICON_PROPS.COLOR.INK_LIGHT} />
        </CardActions>
      </StyledCard>
    </Tooltip>
  );
};
