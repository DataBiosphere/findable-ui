import { InitialArgs } from "../../state/initializer/types";
import { SUGGESTION_VARIANT } from "../../state/types";

export const INITIAL_ARGS: NonNullable<InitialArgs> = {
  inputPlaceholder: "Ask about datasets or variables",
  suggestions: [
    {
      label: "GLP-1 effect + smoking in T2D",
      query:
        "I'm studying whether smoking modifies the effect of GLP-1 agonists on glycemic control in T2D patients",
      variant: SUGGESTION_VARIANT.CHIP,
    },
    {
      label: "WGS for cardiovascular outcomes",
      query:
        "I'm interested in whole genome sequencing data for cardiovascular outcomes",
      variant: SUGGESTION_VARIANT.CHIP,
    },
    {
      label: "RNA-Seq in pancreatic cancer",
      query: "I'm interested in RNA-Seq data for pancreatic cancer",
      variant: SUGGESTION_VARIANT.CHIP,
    },
  ],
  text: "Hello! I can help you find datasets across 2,944 studies from AnVIL, BDC, CRDC, and KFDRC. Describe your research question and I'll build a structured plan and find matching data.",
};
