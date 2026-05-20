import { ComponentProps } from "react";
import { TerraSetUpForm } from "../terraSetUpForm";

export const BOOLEAN_CONTROLS: (keyof ComponentProps<typeof TerraSetUpForm>)[] =
  ["collapsible"];
