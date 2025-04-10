import { ComponentProps } from "react";
import { Summary } from "../summary";

export const SUMMARY_ARGS: ComponentProps<typeof Summary> = {
  data: [
    {
      count: 248890,
      key: "female",
      label: "female",
      selected: false,
    },
    {
      count: 204935,
      key: "male",
      label: "male",
      selected: false,
    },
    {
      count: 240,
      key: "mixed",
      label: "mixed",
      selected: false,
    },
    {
      count: 78715,
      key: "unknown",
      label: "unknown",
      selected: false,
    },
    {
      count: 1561,
      key: null,
      label: "Unspecified",
      selected: false,
    },
  ],
  width: 800,
};

export const SELECT_SUMMARY_ARGS: ComponentProps<typeof Summary> = {
  data: [
    {
      count: 248890,
      key: "female",
      label: "female",
      selected: false,
    },
    {
      count: 204935,
      key: "male",
      label: "male",
      selected: true,
    },
    {
      count: 240,
      key: "mixed",
      label: "mixed",
      selected: false,
    },
    {
      count: 78715,
      key: "unknown",
      label: "unknown",
      selected: false,
    },
    {
      count: 1561,
      key: null,
      label: "Unspecified",
      selected: true,
    },
  ],
  width: 800,
};
