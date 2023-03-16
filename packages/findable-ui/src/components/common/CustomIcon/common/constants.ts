import { ReactElement } from "react";
import { ContentCopyIcon } from "../components/ContentCopyIcon/contentCopyIcon";
import { DownloadIcon } from "../components/DownloadIcon/downloadIcon";
import { InventoryIcon } from "../components/InventoryIcon/inventoryIcon";
import { CustomSVGIconProps } from "./entities";

export const ContentCopyIconSmall = (props: CustomSVGIconProps): ReactElement =>
  ContentCopyIcon({ fontSize: "small", ...props });

export const DownloadIconSmall = (props: CustomSVGIconProps): ReactElement =>
  DownloadIcon({ fontSize: "small", ...props });

export const InventoryIconSmall = (props: CustomSVGIconProps): ReactElement =>
  InventoryIcon({ fontSize: "small", ...props });
