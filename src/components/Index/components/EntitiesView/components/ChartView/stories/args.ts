import { ComponentProps } from "react";
import { ChartView } from "../chartView";

export const CHART_VIEW_ARGS: ComponentProps<typeof ChartView> = {
  categoryFilters: [
    {
      categoryViews: [
        {
          enableChartView: true,
          key: "biological-sex",
          label: "Biological Sex",
          values: [
            {
              count: 248890,
              key: "female",
              label: "female",
              selected: false,
            },
            {
              count: 204935,
              key: "male",
              label: "male",
              selected: false,
            },
            {
              count: 240,
              key: "mixed",
              label: "mixed",
              selected: false,
            },
            {
              count: 78715,
              key: "unknown",
              label: "unknown",
              selected: false,
            },
            {
              count: 1561,
              key: null,
              label: "Unspecified",
              selected: false,
            },
          ],
        },
        {
          enableChartView: true,
          key: "genusSpecies",
          label: "Genus Species",
          values: [
            {
              count: 824,
              key: "canis lupus familiaris",
              label: "canis lupus familiaris",
              selected: false,
            },
            {
              count: 243550,
              key: "Homo sapiens",
              label: "Homo sapiens",
              selected: false,
            },
            {
              count: 277513,
              key: "Mus musculus",
              label: "Mus musculus",
              selected: true,
            },
            {
              count: 1292,
              key: null,
              label: "Unspecified",
              selected: false,
            },
          ],
        },
        {
          enableChartView: false,
          key: "pairedEnd",
          label: "Paired End",
          values: [
            {
              count: 148558,
              key: "false",
              label: "false",
              selected: false,
            },
            {
              count: 366376,
              key: "true",
              label: "true",
              selected: false,
            },
          ],
        },
      ],
    },
  ],
  loading: false,
};
