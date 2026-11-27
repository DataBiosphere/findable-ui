// url=https://www.figma.com/design/xZwI610J55BigYvLkOOGV5/Findable-Contract?node-id=91-19
// source=src/contracts/cc/StatusChip/statusChip.tsx
// component=StatusChip
import figma from "figma";

const instance = figma.selectedInstance;

// `color` is required in code, so every value, `default` included, is written out.
const color = instance.getEnum("color", {
  caution: "STATUS_CHIP_PROPS.COLOR.CAUTION",
  default: "STATUS_CHIP_PROPS.COLOR.DEFAULT",
  error: "STATUS_CHIP_PROPS.COLOR.ERROR",
  info: "STATUS_CHIP_PROPS.COLOR.INFO",
  success: "STATUS_CHIP_PROPS.COLOR.SUCCESS",
  warning: "STATUS_CHIP_PROPS.COLOR.WARNING",
});
const label = instance.getString("label");

const template = {
  example: figma.code`<StatusChip color={${color}} label="${label}" />`,
  id: "cc-StatusChip",
  imports: [
    'import { StatusChip } from "@databiosphere/findable-ui/lib/contracts/cc/StatusChip/statusChip";',
    'import { STATUS_CHIP_PROPS } from "@databiosphere/findable-ui/lib/contracts/cc/StatusChip/constants";',
  ],
  metadata: { nestable: true },
};

export default template;
