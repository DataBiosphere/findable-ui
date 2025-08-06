import { ComponentProps } from "react";
import { TYPOGRAPHY_PROPS } from "../../../../../../../styles/common/mui/typography";
import { LinkCell } from "../linkCell";
import { GetValue } from "./types";

export const CLIENT_SIDE_ARGS: Partial<ComponentProps<typeof LinkCell>> = {
  getValue: (() => ({
    children: "Explore",
    href: "/",
  })) as GetValue,
};

export const EXTERNAL_ARGS: Partial<ComponentProps<typeof LinkCell>> = {
  getValue: (() => ({
    children: "Explore",
    href: "https://www.example.com",
  })) as GetValue,
};

export const INVALID_ARGS: Partial<ComponentProps<typeof LinkCell>> = {
  getValue: (() => ({
    children: "Explore",
  })) as GetValue,
};

export const WITH_CUSTOM_STYLE_ARGS: Partial<ComponentProps<typeof LinkCell>> =
  {
    getValue: (() => ({
      children: "Explore",
      color: "success",
      href: "/",
      underline: "none",
      variant: TYPOGRAPHY_PROPS.VARIANT.BODY_SMALL_400,
    })) as GetValue,
  };
