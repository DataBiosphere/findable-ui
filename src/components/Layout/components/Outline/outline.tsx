import Router from "next/router";
import React, {
  SyntheticEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { TABS_PROPS } from "../../../../styles/common/mui/tabs";
import { DEFAULT_TAB_VALUE } from "./common/constants";
import { useHash } from "./hooks/UseHash/useHash";
import { StyledTab, StyledTabs } from "./outline.styles";
import { OutlineProps } from "./types";
import { mapHash } from "./utils";

export const Outline = ({
  className,
  Contents,
  outline,
  ...props /* MuiTabsProps */
}: OutlineProps): JSX.Element | null => {
  const { hash } = useHash();
  const [value, setValue] = useState<string>(DEFAULT_TAB_VALUE);
  const hashes = useMemo(() => new Set(outline.map(mapHash)), [outline]);

  // Callback fired when selected tab value changes.
  const handleChange = useCallback(
    (_event: SyntheticEvent, hash: string): void => {
      Router.push({ hash });
    },
    []
  );

  // Update value when hash changes.
  useEffect(() => {
    setValue(hashes.has(hash) ? hash : DEFAULT_TAB_VALUE);
  }, [hash, hashes]);

  return (
    <StyledTabs
      className={className}
      indicatorColor={
        value
          ? TABS_PROPS.INDICATOR_COLOR.PRIMARY
          : TABS_PROPS.INDICATOR_COLOR.TRANSPARENT
      }
      onChange={handleChange}
      orientation={TABS_PROPS.ORIENTATION.VERTICAL}
      value={value}
      {...props}
    >
      <Contents value={DEFAULT_TAB_VALUE} />
      {outline.map(({ depth, disabled, hash, value }) => (
        <StyledTab
          depth={depth}
          disabled={disabled}
          key={hash}
          label={value}
          value={hash}
        />
      ))}
    </StyledTabs>
  );
};
