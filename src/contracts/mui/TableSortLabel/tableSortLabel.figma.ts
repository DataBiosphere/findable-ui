// url=https://www.figma.com/design/xZwI610J55BigYvLkOOGV5/Findable-Contract?node-id=129-94
// source=src/contracts/mui/TableSortLabel/theme.ts
// component=TableSortLabel
import figma from "figma";

const instance = figma.selectedInstance;

// Values equal to MUI's defaults (inactive, asc) are left out of the snippet. The theme sets the icon, so the
// snippet has no IconComponent.
const active = instance.getEnum("active", { false: false, true: true });
const direction = instance.getEnum("direction", {
  asc: "",
  desc: "TABLE_SORT_LABEL_PROPS.DIRECTION.DESC",
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

const imports = ['import { TableSortLabel } from "@mui/material";'];
if (direction) {
  imports.push(
    'import { TABLE_SORT_LABEL_PROPS } from "@databiosphere/findable-ui/lib/contracts/mui/TableSortLabel/constants";',
  );
}

const activeProp = active ? " active" : "";
const directionProp = direction ? ` direction={${direction}}` : "";
const disabledProp = disabled ? " disabled" : "";

const template = {
  example: figma.code`<TableSortLabel${activeProp}${directionProp}${disabledProp}>${children}</TableSortLabel>`,
  id: "mui-table-sort-label",
  imports,
  metadata: { nestable: true },
};

export default template;
