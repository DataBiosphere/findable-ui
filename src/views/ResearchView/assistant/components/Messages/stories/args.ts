import { ComponentProps } from "react";
import { Messages } from "../messages";
import { AssistantMessage, MESSAGE_TYPE } from "../../../../state/types";
import { ERROR_MESSAGE } from "../../../../query/constants";

export const ARGS: ComponentProps<typeof Messages> = {
  state: {
    messages: [
      {
        createdAt: 1771998382830,
        inputPlaceholder: "Ask about datasets or variables",
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
        createdAt: 1771998382831,
        text: "I'm studying whether smoking modifies the effect of GLP-1 agonists on glycemic control in T2D patients.",
        type: MESSAGE_TYPE.USER,
      },
      {
        createdAt: 1771998382832,
        response: {
          message:
            'The exact term "glycemic control" has very low study counts (1 study each). I\'ve mapped it to the most relevant clinical measurements: "Glycated Hemoglobin" (HbA1c, 9 studies) and "Fasting Glucose" (44 studies), which are the standard markers used to assess glycemic control in diabetes management.',
          query: {
            mentions: [
              {
                exclude: false,
                facet: "focus",
                originalText: "type 2 diabetes",
                values: ["Diabetes Mellitus, Type 2"],
              },
              {
                exclude: false,
                facet: "measurement",
                originalText: "smoking",
                values: [
                  "Current Smoking Status",
                  "Smoking History",
                  "Smoking Status",
                ],
              },
              {
                exclude: false,
                facet: "measurement",
                originalText: "glycemic control",
                values: ["Glycated Hemoglobin", "Fasting Glucose"],
              },
            ],
          },
        },
        type: MESSAGE_TYPE.ASSISTANT,
      } as AssistantMessage,
      {
        createdAt: 1771998382833,
        text: "What about datasets related to GLP-1 agonists and glycemic control in T2D patients?",
        type: MESSAGE_TYPE.USER,
      },
      {
        createdAt: 1771998382834,
        error: ERROR_MESSAGE.RATE_LIMITED,
        type: MESSAGE_TYPE.ERROR,
      },
      {
        createdAt: 1771998382835,
        text: "I'm studying whether smoking modifies the effect of GLP-1 agonists on glycemic control in T2D patients.",
        type: MESSAGE_TYPE.USER,
      },
      {
        createdAt: 1771998382836,
        response: {
          message: "How do you want to split the smoking groups?",
          query: {
            mentions: [
              {
                exclude: false,
                facet: "focus",
                originalText: "lung cancer",
                values: [
                  "Lung Neoplasms",
                  "Carcinoma, Non-Small-Cell Lung",
                  "Adenocarcinoma of Lung",
                  "Small Cell Lung Carcinoma",
                ],
              },
            ],
          },
        },
        type: MESSAGE_TYPE.ASSISTANT,
      } as AssistantMessage,
    ],
    status: {
      loading: false,
    },
  },
};
