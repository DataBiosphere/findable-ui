// url=https://www.figma.com/design/xZwI610J55BigYvLkOOGV5/Findable-Contract?node-id=9-562
// source=src/contracts/mui/Button/theme.ts
// component=Button
import figma from "figma";

const instance = figma.selectedInstance;

// Values equal to MUI's defaults (text, primary, medium) map to "" and are left out of the snippet.
const color = instance.getEnum("color", {
  primary: "",
  secondary: "BUTTON_PROPS.COLOR.SECONDARY",
});
const size = instance.getEnum("size", {
  large: "BUTTON_PROPS.SIZE.LARGE",
  medium: "",
});
const variant = instance.getEnum("variant", {
  contained: "BUTTON_PROPS.VARIANT.CONTAINED",
  outlined: "BUTTON_PROPS.VARIANT.OUTLINED",
  text: "",
});
// Only `disabled` is a prop; the other states show interaction in mocks.
const disabled = instance.getEnum("state", {
  disabled: true,
  enabled: false,
  focused: false,
  hovered: false,
  pressed: false,
});
const children = instance.getString("children");

const startIcon = instance.getBoolean("startIcon")
  ? instance.getInstanceSwap("startIconSwap")
  : null;
let startIconCode;
if (startIcon && startIcon.type === "INSTANCE") {
  startIconCode = startIcon.executeTemplate().example;
}

const endIcon = instance.getBoolean("endIcon")
  ? instance.getInstanceSwap("endIconSwap")
  : null;
let endIconCode;
if (endIcon && endIcon.type === "INSTANCE") {
  endIconCode = endIcon.executeTemplate().example;
}

const imports = ['import { Button } from "@mui/material";'];
if (color || size || variant) {
  imports.push(
    'import { BUTTON_PROPS } from "@databiosphere/findable-ui/lib/contracts/mui/Button/constants";',
  );
}

const colorProp = color ? ` color={${color}}` : "";
const disabledProp = disabled ? " disabled" : "";
const endIconProp = endIconCode ? figma.code` endIcon={${endIconCode}}` : "";
const sizeProp = size ? ` size={${size}}` : "";
const startIconProp = startIconCode
  ? figma.code` startIcon={${startIconCode}}`
  : "";
const variantProp = variant ? ` variant={${variant}}` : "";

const template = {
  example: figma.code`<Button${colorProp}${disabledProp}${endIconProp}${sizeProp}${startIconProp}${variantProp}>${children}</Button>`,
  id: "mui-button",
  imports,
  metadata: { nestable: true },
};

export default template;
