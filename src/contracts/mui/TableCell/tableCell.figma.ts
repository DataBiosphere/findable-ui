// url=https://www.figma.com/design/xZwI610J55BigYvLkOOGV5/Findable-Contract?node-id=130-31
// source=src/contracts/mui/TableCell/theme.ts
// component=TableCell
import figma from "figma";

const instance = figma.selectedInstance;

// Values equal to MUI's defaults (inherit, medium, body) map to "" and are left out of the snippet.
const align = instance.getEnum("align", {
  inherit: "",
  right: "TABLE_CELL_PROPS.ALIGN.RIGHT",
});
const size = instance.getEnum("size", {
  medium: "",
  small: "TABLE_CELL_PROPS.SIZE.SMALL",
});
const variant = instance.getEnum("variant", {
  body: "",
  head: "TABLE_CELL_PROPS.VARIANT.HEAD",
});
// The children slot holds text by default, or library components such as mui/TableSortLabel, cc/NTagChip or
// cc/StatusChip. Each connected component directly in the slot is rendered from its own template, in layer order;
// nested ones, such as a sort label's icon, come from that component's template. With none, the slot's text is used.
const slot = instance.getSlot("children");
const connected = slot ? slot.connectedInstances : [];
let children;
if (connected.length > 0) {
  children = connected.map((child) => child.executeTemplate().example);
} else {
  const text = instance.findText("text");
  children = text.type === "TEXT" ? text.textContent : "";
}

const imports = ['import { TableCell } from "@mui/material";'];
if (align || size || variant) {
  imports.push(
    'import { TABLE_CELL_PROPS } from "@databiosphere/findable-ui/lib/contracts/mui/TableCell/constants";',
  );
}

const alignProp = align ? ` align={${align}}` : "";
const sizeProp = size ? ` size={${size}}` : "";
const variantProp = variant ? ` variant={${variant}}` : "";

const template = {
  example: figma.code`<TableCell${alignProp}${sizeProp}${variantProp}>${children}</TableCell>`,
  id: "mui-table-cell",
  imports,
  metadata: { nestable: true },
};

export default template;
