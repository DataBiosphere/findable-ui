import { Typography } from "@mui/material";
import { type ComponentProps, Fragment, type JSX } from "react";
import { CHIP_PROPS } from "../../../../../../../styles/common/mui/chip";
import { TYPOGRAPHY_PROPS } from "../../../../../../../styles/common/mui/typography";
import type { IdentityChipProps } from "../components/Chips/components/Chip/types";
import { IdentityCell } from "../identityCell";

/**
 * Builds a "label value" chip label, the way a consumer might render a field as
 * a chip: the field name in light ink, then its value.
 * @param label - Field name.
 * @param value - Field value.
 * @returns The chip label.
 */
function buildLabel(label: string, value: string): JSX.Element {
  return (
    <Fragment>
      <Typography
        color={TYPOGRAPHY_PROPS.COLOR.INK_LIGHT}
        component="span"
        variant={TYPOGRAPHY_PROPS.VARIANT.BODY_SMALL_400}
      >
        {label}
      </Typography>{" "}
      <Typography color={TYPOGRAPHY_PROPS.COLOR.INK_MAIN} component="span">
        {value}
      </Typography>
    </Fragment>
  );
}

const CHIPS: IdentityChipProps[] = [
  { label: buildLabel("organism type", "Homo sapiens") },
  { label: buildLabel("phenotypic sex", "Female") },
  { label: buildLabel("reported ethnicity", "European") },
];

const DONOR_TITLE = {
  label: "ANV5_DONOR_0001",
  url: "",
};

export const COLORED_CHIPS_ARGS: ComponentProps<typeof IdentityCell> = {
  chips: [
    { color: CHIP_PROPS.COLOR.SUCCESS, label: buildLabel("reference", "yes") },
    {
      color: CHIP_PROPS.COLOR.WARNING,
      label: buildLabel("priority", "high"),
      slotProps: {
        tooltip: { title: "Priority pathogen: Plasmodium falciparum" },
      },
    },
    { label: buildLabel("strain", "3D7") },
  ],
  title: { label: "Plasmodium falciparum", url: "/organisms/5833" },
};

export const LABEL_CHIPS_ARGS: ComponentProps<typeof IdentityCell> = {
  chips: CHIPS,
  title: DONOR_TITLE,
};

export const LABEL_CHIPS_LINKED_SUBTITLE_ARGS: ComponentProps<
  typeof IdentityCell
> = {
  chips: CHIPS,
  subtitle: {
    label: "1000 Genomes Project High Coverage",
    url: "/datasets/52ee7665-7033-4ec4-b5ba-95a2f8a7d4c2",
  },
  title: DONOR_TITLE,
};

export const LABEL_ONLY_ARGS: ComponentProps<typeof IdentityCell> = {
  title: DONOR_TITLE,
};

export const LINKED_TITLE_ARGS: ComponentProps<typeof IdentityCell> = {
  chips: [
    {
      label: buildLabel("strain", "3D7"),
      slotProps: { tooltip: { title: "3D7" } },
    },
    {
      label: buildLabel("group", "Apicomplexa"),
      slotProps: { tooltip: { title: "Apicomplexa" } },
    },
  ],
  subtitle: { label: "Tax ID: 5833", url: "" },
  title: { label: "Plasmodium falciparum", url: "/organisms/5833" },
};

export const SUMMARY_SUBTITLE_ARGS: ComponentProps<typeof IdentityCell> = {
  chips: CHIPS,
  subtitle: { label: "3 datasets", url: "" },
  title: DONOR_TITLE,
};

export const WITH_CHIP_SLOT_PROPS_ARGS: ComponentProps<typeof IdentityCell> = {
  chips: [
    ...CHIPS,
    {
      color: CHIP_PROPS.COLOR.INFO,
      label: buildLabel("slot props", "label + tooltip"),
      slotProps: {
        label: { style: { fontStyle: "italic" } },
        tooltip: { placement: "right", title: "Tooltip slot placed right" },
      },
    },
  ],
  subtitle: LABEL_CHIPS_LINKED_SUBTITLE_ARGS.subtitle,
  title: { label: "ANV5_DONOR_0001", url: "/" },
};
