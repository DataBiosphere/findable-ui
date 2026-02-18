import { RangeCategoryView } from "../../../../../common/categories/views/range/types";
import { SelectCategoryView } from "../../../../../common/entities";

/**
 * Biological Sex
 */
const MALE = {
  count: 14,
  key: "male",
  label: "Male",
  selected: false,
};

/**
 * Biological Sex
 */
const FEMALE = {
  count: 12,
  key: "female",
  label: "Female",
  selected: false,
};

/**
 * Genus Species
 */
const HOMO_SAPIENS = {
  count: 471,
  key: "Homo sapiens",
  label: "Homo sapiens",
  selected: false,
};

/**
 * Genus Species
 */
const MUS_MUSCLES = {
  count: 55,
  key: "Mus musculus",
  label: "Mus musculus",
  selected: false,
};

/**
 * File Format
 */
const BAM = {
  count: 7,
  key: "bam",
  label: "bam",
  selected: false,
};

/**
 * File Format
 */
const CSV = {
  count: 5,
  key: "csv",
  label: "csv",
  selected: false,
};

/**
 * File Format
 */
const FASTQ = {
  count: 38,
  key: "fastq",
  label: "fastq",
  selected: false,
};

/**
 * File Format
 */
const TSV = {
  count: 3,
  key: "tsv",
  label: "tsv",
  selected: false,
};

/**
 * File Type
 */
const RAW = {
  count: 1,
  key: "raw",
  label: "raw",
  selected: false,
};

/**
 * File Type
 */
const PROCESSED = {
  count: 1,
  key: "processed",
  label: "processed",
  selected: false,
};

/**
 * Biological Sex select category view
 */
export const BIOLOGICAL_SEX: SelectCategoryView = {
  annotation: {
    description:
      "The biological sex of the donor organism, typically determined by chromosomal composition.",
    label: "Biological Sex",
  },
  key: "biologicalSex",
  label: "Biological Sex",
  values: [MALE, FEMALE],
};

/**
 * Genus Species select category view
 */
export const GENUS_SPECIES: SelectCategoryView = {
  annotation: {
    description:
      "The scientific name of the organism from which the sample was derived.",
    label: "Genus Species",
  },
  key: "genusSpecies",
  label: "Genus Species",
  values: [HOMO_SAPIENS, MUS_MUSCLES],
};

/**
 * Donor Count range category view
 */
export const DONOR_COUNT: RangeCategoryView = {
  annotation: {
    description: "The number of unique donors contributing to the dataset.",
    label: "Donor Count",
  },
  key: "donorCount",
  label: "Donor Count",
  max: 200,
  min: 10,
  selectedMax: null,
  selectedMin: null,
};

/**
 * File Format select category view
 */
export const FILE_FORMAT: SelectCategoryView = {
  annotation: {
    description:
      "The format of the file, such as BAM, CSV, FASTQ, or TSV, indicating how the data is structured.",
    label: "File Format",
  },
  key: "fileFormat",
  label: "File Format",
  values: [BAM, CSV, FASTQ, TSV],
};

/**
 * File Type select category view
 */
export const FILE_TYPE: SelectCategoryView = {
  annotation: {
    description:
      "The type of file, indicating whether the data is raw or has been processed.",
    label: "File Type",
  },
  isDisabled: true,
  key: "fileType",
  label: "File Type",
  values: [RAW, PROCESSED],
};
