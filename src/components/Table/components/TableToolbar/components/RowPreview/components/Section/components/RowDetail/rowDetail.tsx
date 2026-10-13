import { Grid, Typography } from "@mui/material";
import { RowData } from "@tanstack/react-table";
import { JSX, useState } from "react";
import { ListConfig } from "../../../../../../../../../../config/entities";
import { TYPOGRAPHY_PROPS } from "../../../../../../../../../../styles/common/mui/typography";
import { ButtonTextPrimary } from "../../../../../../../../../common/Button/components/ButtonTextPrimary/buttonTextPrimary";
import { ComponentCreator } from "../../../../../../../../../ComponentCreator/ComponentCreator";
import { Section } from "./rowDetail.styles";

const MIN_COLUMNS = 6;

interface RowDetailProps<T extends RowData> {
  className?: string;
  columns: ListConfig<T>["columns"];
  expanded?: boolean;
  minColumns?: number;
  rowData: T;
}

/**
 * Row detail, rendering each column's header above its component built from the row data, with a "Show more" or "Show less" button toggling between all columns and the first few.
 * Each header is styled with its component config's TypographyProps, when given.
 * @param props - Component props.
 * @param props.className - Class name applied to the section.
 * @param props.columns - Columns to show.
 * @param props.expanded - Whether all columns show initially; defaults to true.
 * @param props.minColumns - Number of columns shown when collapsed; defaults to 6.
 * @param props.rowData - Row data.
 * @returns The row detail, or null when the row data is falsy.
 */
export const RowDetail = <T extends RowData>({
  className,
  columns,
  expanded = true,
  minColumns = MIN_COLUMNS,
  rowData,
}: RowDetailProps<T>): JSX.Element | null => {
  const [showMore, setShowMore] = useState<boolean>(expanded);
  const visibleColumns = showMore ? columns : columns.slice(0, minColumns);
  const buttonText = showMore ? "Show less" : "Show more";
  const onToggleShowMore = (): void => setShowMore(!showMore);
  if (!rowData) return null;
  return (
    <Section className={className}>
      {visibleColumns.map(({ componentConfig, header }, i) => (
        <Grid key={i}>
          <Typography
            color={TYPOGRAPHY_PROPS.COLOR.INK_LIGHT}
            variant={TYPOGRAPHY_PROPS.VARIANT.BODY_400}
            {...componentConfig.props?.TypographyProps}
          >
            {header}
          </Typography>
          <ComponentCreator components={[componentConfig]} response={rowData} />
        </Grid>
      ))}
      <ButtonTextPrimary onClick={onToggleShowMore}>
        {buttonText}
      </ButtonTextPrimary>
    </Section>
  );
};
