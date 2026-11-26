import { ErrorIcon } from "../icons/ErrorIcon/errorIcon";
import { InProgressIcon } from "../icons/InProgressIcon/inProgressIcon";
import { PartiallyCompleteIcon } from "../icons/PartiallyCompleteIcon/partiallyCompleteIcon";
import { RequiredIcon } from "../icons/RequiredIcon/requiredIcon";
import { SuccessIcon } from "../icons/SuccessIcon/successIcon";
import { STATUS_CHIP_PROPS } from "../StatusChip/constants";
import type { IconStatus, IconStatusDisplay } from "./types";

const STATUS = {
  BLOCKED: "blocked",
  DONE: "done",
  IN_PROGRESS: "inProgress",
  PARTIALLY_COMPLETE: "partiallyComplete",
  REQUIRED: "required",
} as const;

/**
 * `IconStatusChip`'s prop values, matching the Findable-Contract Figma library's `cc/IconStatusChip`:
 * `status={ICON_STATUS_CHIP_PROPS.STATUS.DONE}`.
 */
export const ICON_STATUS_CHIP_PROPS = {
  STATUS,
} as const;

/**
 * The icon and colour each status draws with.
 */
export const STATUS_DISPLAY: Record<IconStatus, IconStatusDisplay> = {
  [STATUS.BLOCKED]: { Icon: ErrorIcon, color: STATUS_CHIP_PROPS.COLOR.ERROR },
  [STATUS.DONE]: { Icon: SuccessIcon, color: STATUS_CHIP_PROPS.COLOR.SUCCESS },
  [STATUS.IN_PROGRESS]: {
    Icon: InProgressIcon,
    color: STATUS_CHIP_PROPS.COLOR.CAUTION,
  },
  [STATUS.PARTIALLY_COMPLETE]: {
    Icon: PartiallyCompleteIcon,
    color: STATUS_CHIP_PROPS.COLOR.WARNING,
  },
  [STATUS.REQUIRED]: {
    Icon: RequiredIcon,
    color: STATUS_CHIP_PROPS.COLOR.DEFAULT,
  },
};
