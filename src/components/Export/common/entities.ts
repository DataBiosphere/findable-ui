import { MANIFEST_DOWNLOAD_FORMAT } from "../../../apis/azul/common/entities";
import {
  FileFacet,
  Term,
} from "../../../hooks/useFileManifest/common/entities";

/**
 * Set of supported shells that bulk download curl can be executed on.
 */
export enum BULK_DOWNLOAD_EXECUTION_ENVIRONMENT {
  "BASH" = "bash",
  "CMD_EXE" = "cmd.exe",
}

/**
 * Execution environment.
 */
export type ExecutionEnvironment = BULK_DOWNLOAD_EXECUTION_ENVIRONMENT;

/**
 * Model of file summary "file type/file format" facet.
 */
export interface FileSummaryFacet extends Omit<FileFacet, "terms"> {
  formLabel?: string;
  terms: FileSummaryTerm[];
}

/**
 * Model of file summary "file type/file format" facet term.
 */
export interface FileSummaryTerm extends Term {
  size?: number;
}

/**
 * Model of form related facet.
 */
export interface FormFacet {
  fileSummaryFacet?: FileSummaryFacet;
  speciesFacet?: FormFileFacet;
}

/**
 * Model of form file facet.
 */
export interface FormFileFacet extends FileFacet {
  formLabel?: string;
}

/**
 * Manifest download format.
 */
export type ManifestDownloadFormat = MANIFEST_DOWNLOAD_FORMAT;
