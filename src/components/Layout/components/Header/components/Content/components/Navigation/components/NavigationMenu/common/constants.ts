import { PopperProps as MPopperProps } from "@mui/material";

export const POPPER_PROPS: Partial<MPopperProps> = {
  modifiers: [
    {
      name: "flip",
      options: {
        padding: 16,
      },
    },
  ],
  placement: "bottom-start",
  role: "presentation",
  transition: true,
};
