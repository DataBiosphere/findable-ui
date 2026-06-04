import { TabsProps } from "@mui/material";
import Router from "next/router";
import { SyntheticEvent, useCallback } from "react";
import { TABS_PROPS } from "../../../../../../styles/common/mui/tabs";
import { OutlineItem } from "../../types";
import { useHash } from "../UseHash/hook";
import { getNextValue } from "./utils";

export function useTabs(
  outline: OutlineItem[],
): Pick<TabsProps, "indicatorColor" | "onChange" | "orientation" | "value"> {
  const { hash } = useHash();
  const value = getNextValue(hash, outline);

  const onChange = useCallback((_event: SyntheticEvent, hash: string): void => {
    Router.push({ hash });
  }, []);

  return {
    indicatorColor: value
      ? TABS_PROPS.INDICATOR_COLOR.PRIMARY
      : TABS_PROPS.INDICATOR_COLOR.TRANSPARENT,
    onChange,
    orientation: TABS_PROPS.ORIENTATION.VERTICAL,
    value,
  };
}
