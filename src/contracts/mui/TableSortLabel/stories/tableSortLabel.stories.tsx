import {
  Table,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { JSX } from "react";
import { fn } from "storybook/test";
import { TABLE_SORT_LABEL_PROPS } from "../constants";
import { DIRECTIONS } from "./constants";

const meta = {
  component: TableSortLabel,
} satisfies Meta<typeof TableSortLabel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DEFAULT: Story = {
  args: {
    active: false,
    children: "Name",
    direction: TABLE_SORT_LABEL_PROPS.DIRECTION.ASC,
    onClick: fn(),
  },
  decorators: [
    (Story): JSX.Element => (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Story />
            </TableCell>
          </TableRow>
        </TableHead>
      </Table>
    ),
  ],
};

/**
 * Every direction, active and not, and disabled, each in its own head cell.
 * Hover and tab through it to check each state against the Figma component.
 */
export const ALL_COMBINATIONS: Story = {
  render: () => (
    <Table>
      <TableHead>
        <TableRow>
          {[true, false].map((active) =>
            DIRECTIONS.map((direction) => (
              <TableCell key={`${active}-${direction}`}>
                <TableSortLabel
                  active={active}
                  direction={direction}
                  onClick={fn()}
                >
                  {`${active ? "Active" : "Inactive"} ${direction}`}
                </TableSortLabel>
              </TableCell>
            )),
          )}
          <TableCell>
            <TableSortLabel disabled onClick={fn()}>
              Disabled
            </TableSortLabel>
          </TableCell>
        </TableRow>
      </TableHead>
    </Table>
  ),
};
