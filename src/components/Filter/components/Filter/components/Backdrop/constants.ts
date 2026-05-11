import { BackdropProps } from "@mui/material";

export const BACKDROP_PROPS: Omit<BackdropProps, "open"> = {
  slotProps: { transition: { unmountOnExit: true } },
};
