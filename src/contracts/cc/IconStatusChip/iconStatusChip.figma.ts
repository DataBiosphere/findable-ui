// url=https://www.figma.com/design/xZwI610J55BigYvLkOOGV5/Findable-Contract?node-id=117-73
// source=src/contracts/cc/IconStatusChip/iconStatusChip.tsx
// component=IconStatusChip
import figma from "figma";

const instance = figma.selectedInstance;

// `status` is required in code and sets the colour and icon, so every value is written out.
const status = instance.getEnum("status", {
  blocked: "ICON_STATUS_CHIP_PROPS.STATUS.BLOCKED",
  done: "ICON_STATUS_CHIP_PROPS.STATUS.DONE",
  inProgress: "ICON_STATUS_CHIP_PROPS.STATUS.IN_PROGRESS",
  partiallyComplete: "ICON_STATUS_CHIP_PROPS.STATUS.PARTIALLY_COMPLETE",
  required: "ICON_STATUS_CHIP_PROPS.STATUS.REQUIRED",
});
const label = instance.getString("label");

const template = {
  example: figma.code`<IconStatusChip label="${label}" status={${status}} />`,
  id: "cc-IconStatusChip",
  imports: [
    'import { IconStatusChip } from "@databiosphere/findable-ui/lib/contracts/cc/IconStatusChip/iconStatusChip";',
    'import { ICON_STATUS_CHIP_PROPS } from "@databiosphere/findable-ui/lib/contracts/cc/IconStatusChip/constants";',
  ],
  metadata: { nestable: true },
};

export default template;
