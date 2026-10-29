import {
  Button,
  IconButton,
  Theme,
  Tooltip,
  useMediaQuery,
} from "@mui/material";
import { JSX } from "react";
import { bpDown820 } from "../../../../../../styles/common/mixins/breakpoints";
import { ICON_BUTTON_PROPS } from "../../../../../../styles/common/mui/iconButton";
import { SVG_ICON_PROPS } from "../../../../../../styles/common/mui/svgIcon";
import { BUTTON_PROPS } from "../../../../../common/Button/constants";
import { DownloadIcon } from "../../../../../common/CustomIcon/components/DownloadIcon/downloadIcon";
import type { DownloadProps } from "./types";

/**
 * Data dictionary download: a link that downloads the configured file, shown as a secondary button with the download icon and label, or, below 820px, as an icon button with the label as its tooltip and accessible name.
 * @param props - Component props.
 * @param props.download - Download link; the file URL and the button label.
 * @returns The download link, or null when the data dictionary has no download link.
 */
export const Download = ({ download }: DownloadProps): JSX.Element | null => {
  const isIconButton = useMediaQuery((theme: Theme) => bpDown820({ theme }));

  if (!download) return null;

  const { href, label } = download;

  if (isIconButton)
    return (
      <Tooltip title={label}>
        <IconButton
          color={ICON_BUTTON_PROPS.COLOR.SECONDARY}
          download
          href={href}
          size={ICON_BUTTON_PROPS.SIZE.LARGE}
        >
          <DownloadIcon fontSize={SVG_ICON_PROPS.FONT_SIZE.SMALL} />
        </IconButton>
      </Tooltip>
    );

  return (
    <Button
      {...BUTTON_PROPS.SECONDARY_LARGE_CONTAINED}
      download
      href={href}
      startIcon={<DownloadIcon />}
    >
      {label}
    </Button>
  );
};
