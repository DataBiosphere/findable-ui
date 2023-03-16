import React from "react";
import { CategoryTag } from "../../../../common/entities";
import { FilterTag as Tag } from "../FilterTag/filterTag";
import { FilterTags as Tags } from "./filterTags.styles";

export interface FilterTagsProps {
  tags?: CategoryTag[];
}

export const FilterTags = ({ tags }: FilterTagsProps): JSX.Element | null => {
  return tags && tags.length ? (
    <Tags>
      {tags.map(({ label, onRemove, superseded }, t) => (
        <Tag
          key={`${label}${t}`}
          label={label}
          onRemove={onRemove}
          superseded={superseded}
        />
      ))}
    </Tags>
  ) : null;
};
