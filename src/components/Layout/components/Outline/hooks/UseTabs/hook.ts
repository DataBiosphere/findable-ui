import { TabsProps } from "@mui/material";
import Router from "next/router";
import { SyntheticEvent, useCallback, useEffect, useState } from "react";
import { TABS_PROPS } from "../../../../../../styles/common/mui/tabs";
import { OutlineItem } from "../../types";
import { useHash } from "../UseHash/hook";
import { DEFAULT_TAB_VALUE } from "./constants";
import { getNextValue } from "./utils";

export function useTabs(
  outline: OutlineItem[],
): Pick<TabsProps, "indicatorColor" | "onChange" | "orientation" | "value"> {
  const [value, setValue] = useState<TabsProps["value"]>(DEFAULT_TAB_VALUE);
  const { hash } = useHash();

  const onChange = useCallback((_event: SyntheticEvent, hash: string): void => {
    Router.push({ hash });
  }, []);

  useEffect(() => {
    setValue(getNextValue(hash, outline));
  }, [hash, outline]);

  return {
    indicatorColor: value
      ? TABS_PROPS.INDICATOR_COLOR.PRIMARY
      : TABS_PROPS.INDICATOR_COLOR.TRANSPARENT,
    onChange,
    orientation: TABS_PROPS.ORIENTATION.VERTICAL,
    value,
  };
}
