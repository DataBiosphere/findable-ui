// url=https://www.figma.com/design/xZwI610J55BigYvLkOOGV5/Findable-Contract?node-id=101-752
// source=src/contracts/mui/Chip/theme.ts
// component=Chip
import figma from "figma";

const instance = figma.selectedInstance;

// Values equal to findable-ui's defaults (default colour, small size from the theme, MUI's filled) map to "" and are
// left out of the snippet.
const color = instance.getEnum("color", {
  caution: "CHIP_PROPS.COLOR.CAUTION",
  default: "",
  error: "CHIP_PROPS.COLOR.ERROR",
  info: "CHIP_PROPS.COLOR.INFO",
  primary: "CHIP_PROPS.COLOR.PRIMARY",
  success: "CHIP_PROPS.COLOR.SUCCESS",
  warning: "CHIP_PROPS.COLOR.WARNING",
});
const size = instance.getEnum("size", {
  medium: "CHIP_PROPS.SIZE.MEDIUM",
  small: "",
});
const variant = instance.getEnum("variant", {
  filled: "",
  outlined: "CHIP_PROPS.VARIANT.OUTLINED",
});
// Only `disabled` is a prop; the other states show interaction in mocks.
const disabled = instance.getEnum("state", {
  disabled: true,
  enabled: false,
  focused: false,
  hovered: false,
  pressed: false,
});
const label = instance.getString("label");

// MUI shows the delete icon only when the chip has `onDelete`, so the snippet adds a placeholder handler.
const deleteIcon = instance.getBoolean("deleteIcon")
  ? instance.getInstanceSwap("deleteIconSwap")
  : null;
let deleteIconCode;
if (deleteIcon && deleteIcon.type === "INSTANCE") {
  deleteIconCode = deleteIcon.executeTemplate().example;
}

const imports = ['import { Chip } from "@mui/material";'];
if (color || size || variant) {
  imports.push(
    'import { CHIP_PROPS } from "@databiosphere/findable-ui/lib/contracts/mui/Chip/constants";',
  );
}

const colorProp = color ? ` color={${color}}` : "";
const deleteProps = deleteIconCode
  ? figma.code` deleteIcon={${deleteIconCode}} onDelete={() => {}}`
  : "";
const disabledProp = disabled ? " disabled" : "";
const sizeProp = size ? ` size={${size}}` : "";
const variantProp = variant ? ` variant={${variant}}` : "";

const template = {
  example: figma.code`<Chip${colorProp}${deleteProps}${disabledProp} label="${label}"${sizeProp}${variantProp} />`,
  id: "mui-chip",
  imports,
  metadata: { nestable: true },
};

export default template;
