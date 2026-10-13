import { ReactElement } from "react";
import { ContentCopyIcon } from "../components/ContentCopyIcon/contentCopyIcon";
import { DownloadIcon } from "../components/DownloadIcon/downloadIcon";
import { InventoryIcon } from "../components/InventoryIcon/inventoryIcon";
import { CustomSVGIconProps } from "./entities";

/**
 * Renders the content copy icon at small font size; a fontSize in the given props takes precedence.
 * @param props - Icon props.
 * @returns The small content copy icon.
 */
export const ContentCopyIconSmall = (props: CustomSVGIconProps): ReactElement =>
  ContentCopyIcon({ fontSize: "small", ...props });

/**
 * Renders the download icon at small font size; a fontSize in the given props takes precedence.
 * @param props - Icon props.
 * @returns The small download icon.
 */
export const DownloadIconSmall = (props: CustomSVGIconProps): ReactElement =>
  DownloadIcon({ fontSize: "small", ...props });

/**
 * Renders the inventory icon at small font size; a fontSize in the given props takes precedence.
 * @param props - Icon props.
 * @returns The small inventory icon.
 */
export const InventoryIconSmall = (props: CustomSVGIconProps): ReactElement =>
  InventoryIcon({ fontSize: "small", ...props });
