import React from "react";
import { DEFAULT_TAB_VALUE } from "./hooks/UseTabs/constants";
import { useTabs } from "./hooks/UseTabs/hook";
import { StyledTab, StyledTabs } from "./outline.styles";
import { OutlineProps } from "./types";

export const Outline = ({
  className,
  Contents,
  outline,
  ...props /* MuiTabsProps */
}: OutlineProps): JSX.Element | null => {
  const { indicatorColor, onChange, orientation, value } = useTabs(
    outline ?? []
  );

  if (!outline) return null;
  if (!outline.length) return null;

  return (
    <StyledTabs
      className={className}
      indicatorColor={indicatorColor}
      onChange={onChange}
      orientation={orientation}
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
