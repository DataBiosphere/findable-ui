import { OutlinedInputProps } from "@mui/material";

type OutlinedInputPropsOptions = {
  COLOR: typeof COLOR;
};

const COLOR: Record<string, OutlinedInputProps["color"]> = {
  PRIMARY: "primary",
  SECONDARY: "secondary",
};

export const OUTLINED_INPUT_PROPS: OutlinedInputPropsOptions = {
  COLOR,
};
