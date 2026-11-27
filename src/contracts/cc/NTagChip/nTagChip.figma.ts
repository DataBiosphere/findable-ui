// url=https://www.figma.com/design/xZwI610J55BigYvLkOOGV5/Findable-Contract?node-id=125-39
// source=src/contracts/cc/NTagChip/nTagChip.tsx
// component=NTagChip
import figma from "figma";

const instance = figma.selectedInstance;

const label = instance.getString("label");
// `state` is left out: focused only shows the focus ring a tag given a `tabIndex` draws on keyboard focus.

const template = {
  example: figma.code`<NTagChip label="${label}" />`,
  id: "cc-NTagChip",
  imports: [
    'import { NTagChip } from "@databiosphere/findable-ui/lib/contracts/cc/NTagChip/nTagChip";',
  ],
  metadata: { nestable: true },
};

export default template;
