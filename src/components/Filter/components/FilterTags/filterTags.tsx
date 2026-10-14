import { JSX } from "react";
import { CategoryTag } from "../../../../common/entities";
import { FilterTag as Tag } from "../FilterTag/filterTag";
import { FilterTags as Tags } from "./filterTags.styles";

/**
 * Props for the FilterTags component.
 */
export interface FilterTagsProps {
  tags?: CategoryTag[];
}

/**
 * Filter tags, one per tag.
 * @param props - Component props.
 * @param props.tags - Tags, each with a label and a remove function.
 * @returns The filter tags, or null when there are no tags.
 */
export const FilterTags = ({ tags }: FilterTagsProps): JSX.Element | null => {
  return tags && tags.length ? (
    <Tags>
      {tags.map(({ label, onRemove }, t) => (
        <Tag key={`${label}${t}`} label={label} onRemove={onRemove} />
      ))}
    </Tags>
  ) : null;
};
