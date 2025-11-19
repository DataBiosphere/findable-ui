import { ComponentProps } from "react";
import { KeyValueCell } from "../keyValueCell";

export const DEFAULT_ARGS: Partial<ComponentProps<typeof KeyValueCell>> = {
  getValue: (() => ({
    keyValuePairs: new Map([
      ["Updated:", "1 month ago"],
      ["By:", "tracker-prod@hca.com"],
      ["Refreshed:", "6 days ago"],
    ]),
  })) as ComponentProps<typeof KeyValueCell>["getValue"],
};
