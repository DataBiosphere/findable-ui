import { JSX } from "react";
import { DEFAULT_TAB_VALUE } from "./hooks/UseTabs/constants";
import { useTabs } from "./hooks/UseTabs/hook";
import { StyledTab, StyledTabs } from "./outline.styles";
import { OutlineProps } from "./types";

/**
 * Page outline, rendering vertical tabs: the contents tab, then a tab for each outline item, linked to its hash.
 * @param props - Component props.
 * @param props.className - Class name applied to the tabs.
 * @param props.Contents - Contents tab component.
 * @param props.outline - Outline items.
 * @returns The outline, or null when there are no outline items.
 */
export const Outline = ({
  className,
  Contents,
  outline,
  ...props /* MuiTabsProps */
}: OutlineProps): JSX.Element | null => {
  const { indicatorColor, onChange, orientation, value } = useTabs(
    outline ?? [],
  );

  if (!outline?.length) return null;

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
