import React from "react";
import { FilterMenuSearchMatchRange } from "../../common/entities";
import { MatchHighlight } from "./highlightedLabel.styles";

interface HighlightedLabelProps {
  label: string;
  ranges?: FilterMenuSearchMatchRange[];
}

export const HighlightedLabel = ({
  label,
  ranges,
}: HighlightedLabelProps): JSX.Element => {
  const items = [];
  if (ranges) {
    ranges = ranges.slice().sort(({ start: a }, { start: b }) => a - b);
    let prevIndex = 0;
    for (let i = 0; i < ranges.length; i++) {
      const { start } = ranges[i];
      let { end } = ranges[i];
      // Consolidate overlapping ranges
      while (i + 1 < ranges.length && ranges[i + 1].start <= end) {
        i++;
        end = Math.max(end, ranges[i].end);
      }
      const leftChar = label[start - 1];
      const rightChar = label[end];
      const leftOpen = !leftChar || /\s/.test(leftChar);
      const rightOpen = !rightChar || /\s/.test(rightChar);
      const matchItems = [
        label.substring(prevIndex, start),
        <MatchHighlight key={start} leftOpen={leftOpen} rightOpen={rightOpen}>
          {label.substring(start, end)}
        </MatchHighlight>,
      ];
      prevIndex = end;
      items.push(matchItems);
    }
    items.push(label.substring(prevIndex));
  } else {
    items.push(label);
  }
  return <span>{items}</span>;
};
