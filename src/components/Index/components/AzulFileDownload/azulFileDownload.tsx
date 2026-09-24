import { Box } from "@mui/material";
import { JSX, Ref } from "react";
import { ICON_BUTTON_PROPS } from "../../../../styles/common/mui/iconButton";
import { DownloadIcon } from "../../../common/CustomIcon/components/DownloadIcon/downloadIcon";
import { LoadingIcon } from "../../../common/CustomIcon/components/LoadingIcon/loadingIcon";
import { StyledIconButton } from "./azulFileDownload.styles";
import {
  AZUL_FILE_DOWNLOAD_TEST_ID,
  AZUL_FILE_REQUEST_DOWNLOAD_TEST_ID,
} from "./common/constants";
import { getDownloadLabel } from "./common/utils";
import { useDownload } from "./hooks/UseDownload/hook";

export interface AzulFileDownloadProps {
  entityName: string; // The name of the file downloaded.
  ref?: Ref<HTMLSpanElement>; // Ref attached to the outer span; allows direct use as a Tooltip child without a span wrapper at the call site.
  relatedEntityId: string; // ID of the file's dataset / project.
  relatedEntityName: string; // Name of the file's dataset / project.
  url?: string; // Original "file fetch URL" as returned from Azul endpoint.
}

export const AzulFileDownload = ({
  entityName,
  ref,
  relatedEntityId,
  relatedEntityName,
  url,
}: AzulFileDownloadProps): JSX.Element => {
  const { downloadRef, isRequestPending, onDownload } = useDownload({
    entityName,
    relatedEntityId,
    relatedEntityName,
    url,
  });

  return (
    <span ref={ref}>
      {/* A single button, mounted for the lifetime of the component: swapping
       * between two buttons would destroy the focused node when the request
       * state flips and drop keyboard focus to the document body.
       * While the request is in flight the button is aria-disabled rather than
       * disabled, so it stays focusable and a screen reader user can read back
       * its state instead of losing the control they just activated. The styled
       * button suppresses the pointer affordance for aria-disabled.
       * Without a URL the native disabled attribute carries the state, so the
       * ARIA form is omitted rather than duplicating it -- including when the
       * URL disappears while a request is still in flight. */}
      <StyledIconButton
        aria-busy={isRequestPending}
        aria-disabled={url && isRequestPending ? true : undefined}
        aria-label={getDownloadLabel(isRequestPending)}
        color={ICON_BUTTON_PROPS.COLOR.PRIMARY}
        data-testid={AZUL_FILE_REQUEST_DOWNLOAD_TEST_ID}
        disabled={!url}
        Icon={isRequestPending ? LoadingIcon : DownloadIcon}
        onClick={onDownload}
        size={ICON_BUTTON_PROPS.SIZE.MEDIUM}
      />
      <Box
        component="a"
        data-testid={AZUL_FILE_DOWNLOAD_TEST_ID}
        download
        ref={downloadRef}
        sx={{ display: "none" }}
      />
    </span>
  );
};
