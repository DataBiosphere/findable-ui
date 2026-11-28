import { ComponentProps } from "react";
import { TYPOGRAPHY_PROPS } from "../../../../../../../styles/common/mui/typography";
import { LinkCell } from "../linkCell";

export const CLIENT_SIDE_ARGS: Partial<ComponentProps<typeof LinkCell>> = {
  getValue: () => ({
    children: "Explore",
    href: "/",
  }),
};

export const EXTERNAL_ARGS: Partial<ComponentProps<typeof LinkCell>> = {
  getValue: () => ({
    children: "Explore",
    href: "https://www.example.com",
  }),
};

export const INVALID_ARGS: Partial<ComponentProps<typeof LinkCell>> = {
  getValue: () => ({
    children: "Explore",
  }),
};

export const WITH_CUSTOM_STYLE_ARGS: Partial<ComponentProps<typeof LinkCell>> =
  {
    getValue: () => ({
      children: "Explore",
      color: "success",
      href: "/",
      underline: "none",
      variant: TYPOGRAPHY_PROPS.VARIANT.BODY_SMALL_400,
    }),
  };
