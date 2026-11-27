import {
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { JSX } from "react";
import { fn } from "storybook/test";
import { TABLE_SORT_LABEL_PROPS } from "../../TableSortLabel/constants";
import { TABLE_CELL_PROPS } from "../constants";
import { SIZES } from "./constants";

const meta = {
  component: TableCell,
} satisfies Meta<typeof TableCell>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DEFAULT: Story = {
  args: {
    align: TABLE_CELL_PROPS.ALIGN.INHERIT,
    children: "Cell",
    padding: TABLE_CELL_PROPS.PADDING.NORMAL,
    size: TABLE_CELL_PROPS.SIZE.MEDIUM,
    variant: TABLE_CELL_PROPS.VARIANT.BODY,
  },
  decorators: [
    (Story): JSX.Element => (
      <Table>
        <TableBody>
          <TableRow>
            <Story />
          </TableRow>
        </TableBody>
      </Table>
    ),
  ],
};

/**
 * A table at each size: head cells sorted descending, sortable but unsorted, plain, and right aligned, over two body
 * rows. Compare it with the example table on the Figma TableCell page.
 */
export const ALL_COMBINATIONS: Story = {
  render: () => (
    <Stack gap={4}>
      {SIZES.map((size) => (
        <Table key={size} size={size}>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active
                  direction={TABLE_SORT_LABEL_PROPS.DIRECTION.DESC}
                  onClick={fn()}
                >
                  {`Name (${size})`}
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel onClick={fn()}>Organism</TableSortLabel>
              </TableCell>
              <TableCell>Format</TableCell>
              <TableCell align={TABLE_CELL_PROPS.ALIGN.RIGHT}>Files</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Brain atlas</TableCell>
              <TableCell>Homo sapiens</TableCell>
              <TableCell>h5ad</TableCell>
              <TableCell align={TABLE_CELL_PROPS.ALIGN.RIGHT}>1,204</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Lung atlas</TableCell>
              <TableCell>Mus musculus</TableCell>
              <TableCell>loom</TableCell>
              <TableCell align={TABLE_CELL_PROPS.ALIGN.RIGHT}>86</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      ))}
    </Stack>
  ),
};
