import { Typography } from "@mui/material";
import { CellContext } from "@tanstack/react-table";
import { JSX } from "react";
import { Attribute } from "../../../common/entities";
import { TYPOGRAPHY_PROPS } from "../../../styles/common/mui/typography";

/**
 * Renders an attribute's description, and its example where there is one.
 * Stands in for the consumer's own detail cell; the point here is a realistic
 * amount of copy, since row height drives the page's scroll length.
 * @param props - Cell context.
 * @param props.row - Table row.
 * @returns The description cell.
 */
export const DetailCell = ({
  row,
}: CellContext<Attribute, unknown>): JSX.Element => {
  const { description, example } = row.original;
  return (
    <div>
      <Typography component="div" variant={TYPOGRAPHY_PROPS.VARIANT.BODY_400}>
        {description}
      </Typography>
      {example && (
        <Typography
          color={TYPOGRAPHY_PROPS.COLOR.INK_LIGHT}
          component="div"
          variant={TYPOGRAPHY_PROPS.VARIANT.BODY_SMALL_400}
        >
          e.g. {example}
        </Typography>
      )}
    </div>
  );
};

/**
 * Renders an attribute's display title above its programmatic name.
 * @param props - Cell context.
 * @param props.row - Table row.
 * @returns The field cell.
 */
export const FieldCell = ({
  row,
}: CellContext<Attribute, unknown>): JSX.Element => {
  const { name, title } = row.original;
  return (
    <div>
      <Typography component="div" variant={TYPOGRAPHY_PROPS.VARIANT.BODY_500}>
        {title}
      </Typography>
      <Typography
        color={TYPOGRAPHY_PROPS.COLOR.INK_LIGHT}
        component="div"
        variant={TYPOGRAPHY_PROPS.VARIANT.BODY_SMALL_400}
      >
        {name}
      </Typography>
    </div>
  );
};
