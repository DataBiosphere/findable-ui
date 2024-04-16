import { useRouter } from "next/router";
import React, { ElementType, SyntheticEvent, useEffect, useState } from "react";
import { DEFAULT_TAB_VALUE } from "./common/constants";
import { ContentsTabProps } from "./components/ContentsTab/contentsTab";
import { Tab, Tabs } from "./outline.styles";

export interface OutlineItem {
  depth: number;
  hash: string;
  value: string;
}

export interface OutlineProps {
  className?: string;
  Contents: ElementType<ContentsTabProps>;
  outline: OutlineItem[];
}

export const Outline = ({
  className,
  Contents,
  outline,
  ...props /* Spread props to allow for Mui Tabs specific prop overrides. */
}: OutlineProps): JSX.Element => {
  const { asPath, push } = useRouter();
  const [activeTab, setActiveTab] = useState<string>("");

  // Callback fired when selected tab value changes.
  const handleChange = (
    _event: SyntheticEvent<Element, Event>,
    tabValue: string
  ): void => {
    push(`#${tabValue}`);
  };

  // Update active tab when path changes.
  useEffect(() => {
    setActiveTab(getActiveTab(outline, asPath));
  }, [asPath, outline]);

  return (
    <Tabs
      className={className}
      indicatorColor={activeTab ? "primary" : "transparent"}
      onChange={handleChange}
      orientation="vertical"
      value={activeTab}
      {...props}
    >
      <Contents value={DEFAULT_TAB_VALUE} />
      {outline.map(({ depth, hash, value }) => (
        <Tab key={hash} depth={depth} label={value} value={hash} />
      ))}
    </Tabs>
  );
};

/**
 * Initializes active tab.
 * @param outline - Outline items.
 * @param asPath - Current path.
 * @returns active tab.
 */
function getActiveTab(outline: OutlineItem[], asPath: string): string {
  if (asPath.includes("#")) {
    const hashLink = asPath.split("#")[1];
    if (outline.some(({ hash }) => hash === hashLink)) {
      return hashLink;
    }
  }
  return DEFAULT_TAB_VALUE;
}
