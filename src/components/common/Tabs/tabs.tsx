import {
  TabProps as MTabProps,
  Tabs as MTabs,
  TabsProps as MTabsProps,
} from "@mui/material";
import React, { ReactElement, ReactNode } from "react";
import { DataDictionaryAnnotation } from "../../../common/entities";
import { Tooltip } from "../../DataDictionary/components/Tooltip/tooltip";
import { Tab, TabScrollFuzz } from "./tabs.styles";

export type TabsValue = MTabsProps["value"]; // any
export type TabValue = MTabProps["value"]; // any
export type OnTabChangeFn = (tabValue: TabValue) => void; // Function invoked when selected tab value changes.

export interface Tab {
  annotation?: DataDictionaryAnnotation;
  count?: string;
  icon?: MTabProps["icon"]; // element or string
  iconPosition?: MTabProps["iconPosition"]; // "bottom" or "end" or "start" or "top
  label: ReactNode;
  value: TabValue;
}

export interface TabsProps {
  className?: string;
  onTabChange: OnTabChangeFn;
  tabs: Tab[];
  value: TabsValue;
}

export const Tabs = ({
  className,
  onTabChange,
  tabs,
  value,
}: TabsProps): JSX.Element => {
  return (
    <MTabs
      allowScrollButtonsMobile
      className={className}
      onChange={(_, tabValue): void => onTabChange(tabValue)}
      ScrollButtonComponent={TabScrollFuzz} // Utilizing MuiTabScrollButton to show/hide scroll fuzz.
      value={value}
    >
      {tabs.map(
        (
          {
            annotation,
            count,
            icon,
            iconPosition = "start",
            label,
            value: tabValue,
          },
          t
        ) => (
          <Tab
            icon={icon}
            iconPosition={icon ? iconPosition : undefined}
            key={`${label}${t}`}
            label={buildTabLabel(label, count, annotation)}
            value={tabValue}
          />
        )
      )}
    </MTabs>
  );
};

/**
 * Build a tab value from a tab config. Specifically, display the tab label
 * with a tooltip annotation if necessary.
 * @param label - Tab display value.
 * @param count - Optional count to display next to the tab label.
 * @param annotation - Data dictionary annotation.
 * @returns Tab label with optional count and tooltip.
 */
function buildTabLabel(
  label: ReactNode,
  count?: string,
  annotation?: DataDictionaryAnnotation
): ReactElement {
  return (
    <Tooltip description={annotation?.description} title={annotation?.label}>
      <span>{count ? `${label} (${count})` : label}</span>
    </Tooltip>
  );
}
