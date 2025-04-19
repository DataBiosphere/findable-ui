import { Components, Theme } from "@mui/material";
import { TABLE_CELL_PROPS } from "../../styles/common/mui/tableCell";
import { TYPOGRAPHY_PROPS } from "../../styles/common/mui/typography";

export const MuiTableCell = (theme: Theme): Components["MuiTableCell"] => {
  const paletteSmoke = theme.palette.smoke;
  const typography = theme.typography;
  return {
    defaultProps: {},
    styleOverrides: {
      root: {
        minHeight: 56,
        stickyHeader: {
          boxShadow: `0 1px 0 ${paletteSmoke.main}`,
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
              ...typography[TYPOGRAPHY_PROPS.VARIANT.BODY_400],
            },
          },
          {
            props: { variant: TABLE_CELL_PROPS.VARIANT.HEAD },
            style: {
              ...typography[TYPOGRAPHY_PROPS.VARIANT.BODY_SMALL_500],
              backgroundColor: paletteSmoke.lightest,
            },
          },
        ],
      },
    },
  };
};
