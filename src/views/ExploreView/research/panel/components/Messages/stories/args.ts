import { ComponentProps } from "react";
import { Messages } from "../messages";
import { AssistantMessage, MESSAGE_TYPE } from "../../../../state/types";
import { ERROR_MESSAGE } from "../../../../query/constants";

export const ARGS: ComponentProps<typeof Messages> = {
  state: {
    messages: [
      {
        inputPrefill: "Ask about datasets or variables",
        suggestions: [
          {
            label: "GLP-1 effect + smoking in T2D",
            query:
              "I'm studying whether smoking modifies the effect of GLP-1 agonists on glycemic control in T2D patients",
            variant: "CHIP",
          },
          {
            label: "WGS for cardiovascular outcomes",
            query:
              "I'm interested in whole genome sequencing data for cardiovascular outcomes",
            variant: "CHIP",
          },
          {
            label: "RNA-Seq in pancreatic cancer",
            query: "I'm interested in RNA-Seq data for pancreatic cancer",
            variant: "CHIP",
          },
        ],
        text: "Hello! I can help you find datasets across 2,944 studies from AnVIL, BDC, CRDC, and KFDRC. Describe your research question and I'll build a structured plan and find matching data.",
        type: MESSAGE_TYPE.PROMPT,
      },
      {
        text: "I'm studying whether smoking modifies the effect of GLP-1 agonists on glycemic control in T2D patients.",
        type: MESSAGE_TYPE.USER,
      },
      {
        response: {
          message:
            "Found 3 studies with all five criteria met and 2 more with partial coverage. Top match is ACCORD (phs000209) — it has smoking strata, GLP-1 medication records, and HbA1c at baseline and 6-month follow-up.",
        },
        type: MESSAGE_TYPE.ASSISTANT,
      } as AssistantMessage,
      {
        text: "What about datasets related to GLP-1 agonists and glycemic control in T2D patients?",
        type: MESSAGE_TYPE.USER,
      },
      {
        error: ERROR_MESSAGE.RATE_LIMITED,
        type: MESSAGE_TYPE.ERROR,
      },
      {
        text: "I'm studying whether smoking modifies the effect of GLP-1 agonists on glycemic control in T2D patients.",
        type: MESSAGE_TYPE.USER,
      },
      {
        response: {
          message: "How do you want to split the smoking groups?",
        },
        type: MESSAGE_TYPE.ASSISTANT,
      } as AssistantMessage,
    ],
    status: {
      loading: false,
    },
  },
};
