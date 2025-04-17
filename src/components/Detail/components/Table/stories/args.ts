import { ComponentProps } from "react";
import { Table } from "../table";

export const DEFAULT_DATA = {
  DATA_TYPES: {
    EXOME: "Exome",
    METHYLATION_ARRAY: "Methylation Array",
    RNASEQ: "RNAseq",
    WHOLE_GENOME: "Whole Genome",
  },
  DISEASES: {
    ATHEROSCLEROSIS: "Atherosclerosis",
    CONTROL: "Control",
    EPIGENETIC_VARIATION: "Epigenetic Variation",
    MYOCARDIAL_INFARCTION: "Myocardial Infarction",
    NONE: "None",
  },
  STUDY_NAME: {
    CARDIOVASCULAR_DISEASE_STUDY: "Cardiovascular Disease Study",
    CORONARY_ARTERY_DISEASE_STUDY: "Coronary Artery Disease Study",
    EPIGENETIC_STUDY: "Epigenetic Study",
    EPILEPSY_STUDY: "Epilepsy Study",
    GENOMIC_STUDY: "Genomic Study",
    MYOCARDIAL_INFARCTION_STUDY: "Myocardial Infarction Study",
  },
};

export const DEFAULT_TABLE_ARGS: ComponentProps<typeof Table> = {
  columns: [
    {
      accessorKey: "studyName",
      filterFn: "arrIncludesSome",
      header: "Study Name",
      id: "studyName",
    },
    {
      accessorKey: "dataType",
      filterFn: "arrIncludesSome",
      header: "Data Type",
      id: "dataType",
    },
    {
      accessorKey: "disease",
      filterFn: "arrIncludesSome",
      header: "Disease",
      id: "disease",
    },
    {
      accessorKey: "participantCount",
      filterFn: "inNumberRange",
      header: "Participation Count",
      id: "participantCount",
    },
  ],
  gridTemplateColumns: "auto repeat(3, 1fr) auto",
  items: [
    {
      dataType: [
        DEFAULT_DATA.DATA_TYPES.WHOLE_GENOME,
        DEFAULT_DATA.DATA_TYPES.EXOME,
      ],
      disease: DEFAULT_DATA.DISEASES.ATHEROSCLEROSIS,
      participantCount: 265,
      studyName: DEFAULT_DATA.STUDY_NAME.CORONARY_ARTERY_DISEASE_STUDY,
    },
    {
      dataType: [DEFAULT_DATA.DATA_TYPES.EXOME],
      disease: DEFAULT_DATA.DISEASES.CONTROL,
      participantCount: 102,
      studyName: DEFAULT_DATA.STUDY_NAME.EPILEPSY_STUDY,
    },
    {
      dataType: [DEFAULT_DATA.DATA_TYPES.WHOLE_GENOME],
      disease: DEFAULT_DATA.DISEASES.MYOCARDIAL_INFARCTION,
      participantCount: 103,
      studyName: DEFAULT_DATA.STUDY_NAME.MYOCARDIAL_INFARCTION_STUDY,
    },
    {
      dataType: [DEFAULT_DATA.DATA_TYPES.EXOME],
      disease: DEFAULT_DATA.DISEASES.MYOCARDIAL_INFARCTION,
      participantCount: 10,
      studyName: DEFAULT_DATA.STUDY_NAME.CARDIOVASCULAR_DISEASE_STUDY,
    },
    {
      dataType: [DEFAULT_DATA.DATA_TYPES.RNASEQ],
      disease: DEFAULT_DATA.DISEASES.NONE,
      participantCount: 23,
      studyName: DEFAULT_DATA.STUDY_NAME.GENOMIC_STUDY,
    },
    {
      dataType: [DEFAULT_DATA.DATA_TYPES.METHYLATION_ARRAY],
      disease: DEFAULT_DATA.DISEASES.EPIGENETIC_VARIATION,
      participantCount: 1,
      studyName: DEFAULT_DATA.STUDY_NAME.EPIGENETIC_STUDY,
    },
  ],
};
