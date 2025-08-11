import { Components } from "@mui/material";
import { FONT } from "../../styles/common/constants/font";
import { PALETTE } from "../../styles/common/constants/palette";
import { TABLE_CELL_PROPS } from "../../styles/common/mui/tableCell";

export const MuiTableCell: Components["MuiTableCell"] = {
  defaultProps: {},
  styleOverrides: {
    root: {
      minHeight: 56,
      stickyHeader: {
        boxShadow: `0 1px 0 ${PALETTE.SMOKE_MAIN}`,
      },
      variants: [
        {
          props: { size: TABLE_CELL_PROPS.SIZE.MEDIUM },
          style: { padding: "10px 16px" },
        },
        {
          props: { size: TABLE_CELL_PROPS.SIZE.SMALL },
          style: { padding: "8px 16px" },
        },
        {
          props: { padding: TABLE_CELL_PROPS.PADDING.CHECKBOX },
          style: { paddingRight: 0, width: "unset" },
        },
        {
          props: { padding: TABLE_CELL_PROPS.PADDING.NONE },
          style: { padding: 0 },
        },
        {
          props: { variant: TABLE_CELL_PROPS.VARIANT.BODY },
          style: {
            font: FONT.BODY_400,
            // eslint-disable-next-line sort-keys -- disabling key order for readability
            "& mark": {
              backgroundColor: PALETTE.WARNING_LIGHT,
              color: "inherit",
              padding: "2px 0",
            },
          },
        },
        {
          props: { variant: TABLE_CELL_PROPS.VARIANT.HEAD },
          style: {
            backgroundColor: PALETTE.SMOKE_LIGHTEST,
            font: FONT.BODY_SMALL_500,
          },
        },
      ],
    },
  },
};
