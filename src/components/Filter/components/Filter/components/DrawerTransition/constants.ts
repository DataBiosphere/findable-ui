import { SlideProps } from "@mui/material";

export const SIDE_PROPS: Omit<SlideProps, "children"> = {
  direction: "right",
  easing: "ease-out",
  timeout: { enter: 250, exit: 300 },
  unmountOnExit: true,
};
