import { Grid, Typography } from "@mui/material";
import { RowData, Table } from "@tanstack/react-table";
import React from "react";
import { ListConfig } from "../../../../../../../../../../config/entities";
import { TEXT_BODY_400 } from "../../../../../../../../../../theme/common/typography";
import { ButtonTextPrimary } from "../../../../../../../../../common/Button/components/ButtonTextPrimary/buttonTextPrimary";
import { ComponentCreator } from "../../../../../../../../../ComponentCreator/ComponentCreator";
import { Section } from "./rowDetail.styles";

const MIN_COLUMNS = 6;

interface RowDetailProps<T extends RowData> {
  className?: string;
  columns: ListConfig<T>["columns"];
  expanded?: boolean;
  minColumns?: number;
  tableInstance: Table<T>;
}

export const RowDetail = <T extends RowData>({
  className,
  columns,
  expanded = true,
  minColumns = MIN_COLUMNS,
  tableInstance,
}: RowDetailProps<T>): JSX.Element | null => {
  const [showMore, setShowMore] = React.useState<boolean>(expanded);
  const { getRowPreviewRow } = tableInstance;
  const { original: rowData } = getRowPreviewRow() || {};
  const visibleColumns = showMore ? columns : columns.slice(0, minColumns);
  const buttonText = showMore ? "Show less" : "Show more";
  const onToggleShowMore = (): void => setShowMore(!showMore);
  if (!rowData) return null;
  return (
    <Section className={className}>
      {visibleColumns.map(({ componentConfig, header }, i) => (
        <Grid key={i}>
          <Typography
            color="ink.light"
            variant={TEXT_BODY_400}
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
