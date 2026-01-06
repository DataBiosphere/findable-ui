import { Link, Typography } from "@mui/material";
import { JSX } from "react";
import { CollapsableSection } from "../../../common/Section/components/CollapsableSection/collapsableSection";
import { ANCHOR_TARGET, REL_ATTRIBUTE } from "../../../Links/common/entities";

export const DataReleasePolicy = (): JSX.Element => {
  return (
    <CollapsableSection title="Data Access Policy">
      <Typography>
        For information regarding data sharing and data use, please see our{" "}
        <Link
          href="https://anvilproject.org/faq/data-security/"
          rel={REL_ATTRIBUTE.NO_OPENER_NO_REFERRER}
          target={ANCHOR_TARGET.BLANK}
        >
          Data Access Policy
        </Link>
        .
      </Typography>
    </CollapsableSection>
  );
};
