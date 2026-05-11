import { PopperProps } from "@mui/material";
import { POPPER_PROPS as MUI_POPPER_PROPS } from "../../../../../../styles/common/mui/popper";

export const POPPER_PROPS: Omit<PopperProps, "open"> = {
  placement: MUI_POPPER_PROPS.PLACEMENT.BOTTOM_START,
  popperOptions: {
    modifiers: [
      {
        name: "flip",
        options: {
          fallbackPlacements: [
            MUI_POPPER_PROPS.PLACEMENT.TOP_START,
            MUI_POPPER_PROPS.PLACEMENT.RIGHT,
          ],
        },
      },
      { name: "offset", options: { offset: [0, 4] } },
    ],
  },
  role: "dialog",
  transition: true,
};
