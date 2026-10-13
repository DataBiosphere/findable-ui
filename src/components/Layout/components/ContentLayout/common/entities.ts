/**
 * Panel background colors for the content layout's content, navigation and outline panels.
 */
export interface LayoutStyle {
  content?: PanelBackgroundColor;
  navigation?: PanelBackgroundColor;
  outline?: PanelBackgroundColor;
}

export enum PANEL_BACKGROUND_COLOR {
  DEFAULT = "DEFAULT",
  SMOKE_LIGHT = "SMOKE_LIGHT",
  SMOKE_LIGHTEST = "SMOKE_LIGHTEST",
}

export type PanelBackgroundColor = keyof typeof PANEL_BACKGROUND_COLOR;
