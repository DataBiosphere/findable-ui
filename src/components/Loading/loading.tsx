import { Fade, SvgIconProps, Typography } from "@mui/material";
import { JSX } from "react";
import { TYPOGRAPHY_PROPS } from "../../styles/common/mui/typography";
import { LoadingIcon } from "../common/CustomIcon/components/LoadingIcon/loadingIcon";
import { PAPER_PANEL_STYLE, PaperPanelStyle } from "../common/Paper/paper";
import { LOADING_CLASS_NAME } from "./constants";
import { LoadingPaper, LoadingPositioner } from "./loading.styles";

export type LoadingPanelStyle =
  keyof typeof LOADING_PANEL_STYLE | PaperPanelStyle;

/**
 * Possible set of loading variant "panel" style values.
 */
export enum LOADING_PANEL_STYLE {
  INHERIT = "INHERIT",
}

/**
 * Props for the Loading component.
 */
export interface LoadingProps {
  /* `appear`, if false, the component will not transition on the initial render and onEnter callbacks will not be called.
   * In this instance, ensure the parent container is styled correctly with position relative.
   */
  appear?: boolean;
  /* `autoPosition`, if true, the loading component will automatically apply `position: relative` to its parent on enter and remove it on exit.
   * False will disable this behavior, and the parent will need to be styled with `position: relative` manually.
   */
  autoPosition?: boolean;
  iconSize?: SvgIconProps["fontSize"];
  loading: boolean;
  panelStyle?: LoadingPanelStyle; // Enables loading to mirror parent container styles.
  text?: string;
}

/**
 * Loading component.
 * For the loading component to consume its parent's container the component should be a direct descendant of the parent container.
 * @param props - Component props.
 * @param props.appear - Whether to fade in on first render. Defaults to true.
 * @param props.autoPosition - Whether to set position relative on the parent while shown. Defaults to true.
 * @param props.iconSize - Icon size. Defaults to large.
 * @param props.loading - Whether to show the loading indicator.
 * @param props.panelStyle - Panel style, to mirror the parent container. Defaults to rounded.
 * @param props.text - Text shown under the icon.
 * @returns The loading indicator, faded in while loading.
 */
export const Loading = ({
  appear = true,
  autoPosition = true,
  iconSize = "large",
  loading,
  panelStyle = PAPER_PANEL_STYLE.ROUNDED,
  text,
}: LoadingProps): JSX.Element | null => {
  return (
    <Fade
      appear={appear}
      in={loading}
      mountOnEnter
      onEnter={autoPosition ? onFadeEnter : undefined}
      onExited={autoPosition ? onFadeExited : undefined}
      timeout={300}
      unmountOnExit
    >
      <LoadingPositioner className={LOADING_CLASS_NAME} panelStyle={panelStyle}>
        <LoadingPaper panelStyle={panelStyle}>
          <LoadingIcon color="primary" fontSize={iconSize} />
          {text && (
            <Typography variant={TYPOGRAPHY_PROPS.VARIANT.BODY_400}>
              {text}
            </Typography>
          )}
        </LoadingPaper>
      </LoadingPositioner>
    </Fade>
  );
};

/**
 * Callback fired before the "entering" status is applied.
 * The loading element's parent element is assigned position style "relative" for positioning of the loading element.
 * @param node - Loading element.
 */
function onFadeEnter(node: HTMLElement): void {
  const parentEl = node.parentElement;
  if (parentEl) parentEl.style.setProperty("position", "relative");
}

/**
 * Callback fired after the "exited" status is applied.
 * Removes the loading element's parent element position styles.
 * @param node - Loading element.
 */
function onFadeExited(node: HTMLElement): void {
  const parentEl = node.parentElement;
  if (parentEl) parentEl.style.removeProperty("position");
}
