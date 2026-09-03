import { DataDictionary } from "../../../common/entities";

/**
 * HCA Tier 1 metadata, trimmed for use as a story fixture.
 *
 * Taken from the data-portal site config (`dataDictionary/tier-1.json`). Three
 * things are dropped, none of which any column rendered by this story reads: the
 * per-attribute `bioNetworks` annotation (18 entries repeated across 50
 * attributes), and the `rationale` and `values` free text. All 7 classes, all 50
 * attributes, and the copy the visible columns do render — title, name,
 * description, example — are verbatim, so row heights and the resulting scroll
 * length match production. Keys are sorted to satisfy `sort-keys`.
 *
 * @see https://data.humancellatlas.org/metadata/tier-1
 */
export const TIER_1_DICTIONARY: DataDictionary = {
  classes: [
    {
      attributes: [
        {
          annotations: {
            annDataLocation: "uns",
            tier: "Tier 1",
          },
          description:
            "Principal Investigator(s) leading the study where the data is/was used.",
          example: "Sarah,A,Teichmann",
          multivalued: true,
          name: "study_pi",
          range: "string",
          required: true,
          title: "Study PI",
        },
        {
          annotations: {
            annDataLocation: "uns",
            cxg: "batch_condition",
            tier: "Tier 1",
          },
          description:
            "*Note: Name of the covariate that confers the dominant batch effect in the data as judged by the data contributor. The name provided here should be the label by which this covariate is stored in the AnnData object.*",
          example: '["patient", "seqBatch"]',
          multivalued: true,
          name: "batch_condition",
          range: "string",
          required: false,
          title: "Batch Condition",
        },
        {
          annotations: {
            annDataLocation: "uns",
            cxg: "default_embedding",
            tier: "Tier 1",
          },
          description:
            "The value must match a key to an embedding in obsm for the embedding to display by default in CELLxGENE Explorer.",
          multivalued: false,
          name: "default_embedding",
          range: "string",
          required: false,
          title: "Default Embedding",
        },
        {
          annotations: {
            annDataLocation: "obs",
            tier: "Tier 1",
          },
          description: "Platform used for sequencing.",
          example: "EFO:0008563",
          multivalued: false,
          name: "sequencing_platform",
          range: "string",
          required: false,
          title: "Sequencing Platform",
        },
        {
          annotations: {
            annDataLocation: "obs",
            cxg: "assay_ontology_term_id",
            tier: "Tier 1",
          },
          description: "Platform used for single cell library construction.",
          example: "EFO:0009922",
          multivalued: false,
          name: "assay_ontology_term_id",
          range: "string",
          required: true,
          title: "Assay Ontology Term ID",
        },
        {
          annotations: {
            annDataLocation: "obs",
            tier: "Tier 1",
          },
          description: "Reference genome used for alignment.",
          example: "GRCh38; GRCh37",
          multivalued: false,
          name: "reference_genome",
          range: "string",
          required: true,
          title: "Reference Genome",
        },
        {
          annotations: {
            annDataLocation: "obs",
            tier: "Tier 1",
          },
          description:
            "Protocol used for alignment analysis, please specify which version was used e.g. cell ranger 2.0, 2.1.1 etc.",
          example: "cell ranger 3.0.1; kallisto bustools; GSNAP",
          multivalued: false,
          name: "alignment_software",
          range: "string",
          required: true,
          title: "Alignment Software",
        },
        {
          annotations: {
            annDataLocation: "obs",
            tier: "Tier 1",
          },
          description:
            "Were introns included during read counting in the alignment process?",
          example: "yes; no",
          multivalued: false,
          name: "intron_inclusion",
          range: "string",
          required: false,
          title: "Intron Inclusion",
        },
        {
          annotations: {
            annDataLocation: "obs",
            tier: "Tier 1",
          },
          description:
            "Which part of the RNA transcript was targeted for sequencing.",
          example: "3 prime tag; full length",
          multivalued: false,
          name: "sequenced_fragment",
          range: "string",
          required: true,
          title: "Sequenced Fragment",
        },
        {
          annotations: {
            annDataLocation: "obs",
            tier: "Tier 1",
          },
          description:
            "Ensembl release version accession number. Some common codes include:\n\n GRCh38.p12 = GCF_000001405.38\n\n GRCh38.p13 = GCF_000001405.39\n\n GRCh38.p14 = GCF_000001405.40",
          example: "v110; GCF_000001405.40",
          multivalued: false,
          name: "gene_annotation_version",
          range: "string",
          required: true,
          title: "Gene Annotation Version",
        },
        {
          annotations: {
            annDataLocation: "uns",
            tier: "Tier 1",
          },
          description:
            "Other technical or experimental covariates that could affect the quality or batch of the sample. Must not contain identifiers. This field is designed to capture potential challenges for data integration not captured elsewhere.",
          multivalued: false,
          name: "comments",
          range: "string",
          required: false,
          title: "Comments",
        },
        {
          annotations: {
            annDataLocation: "obs",
            tier: "Tier 1",
          },
          description:
            "The protocols.io URL (if none exists, please use the BioRxiv URL) for the full experimental protocol; or if multiple protocols exist please list them e.g. sample preparation protocol / sequencing protocol.",
          example: "https://www.biorxiv.org/conte nt/early/2017/09/24/193219",
          multivalued: false,
          name: "protocol_url",
          range: "string",
          required: false,
          title: "Protocol URL",
        },
        {
          annotations: {
            annDataLocation: "uns",
            cxg: "title",
            tier: "Tier 1",
          },
          description:
            "This text describes and differentiates the dataset from other datasets in the same collection. It is strongly recommended that each dataset title in a collection is unique and does not depend on other metadata such as a different assay to disambiguate it from other datasets in the collection.",
          example:
            'Cells of the adult human heart collection is "All — Cells of the adult human heart"',
          multivalued: false,
          name: "title",
          range: "string",
          required: true,
          title: "Title",
        },
        {
          annotations: {
            annDataLocation: "obs",
            tier: "Tier 1",
          },
          description:
            "Was ambient count correction software used during cellxgene processing? If so, which software?",
          example: "none; soupx; cellbender",
          multivalued: false,
          name: "ambient_count_correction",
          range: "string",
          required: true,
          title: "Ambient Count Correction",
        },
        {
          annotations: {
            annDataLocation: "obs",
            tier: "Tier 1",
          },
          description:
            "Was doublet detection software used during cellxgene processing? If so, which software?",
          example: "none; doublet_finder; manual",
          multivalued: false,
          name: "doublet_detection",
          range: "string",
          required: true,
          title: "Doublet Detection",
        },
        {
          annotations: {
            annDataLocation: "obsm",
            cxg: "x_suffix",
            tier: "Tier 1",
          },
          description:
            "AnnData stores embeddings under keys in `obsm` that start with `X_`. Each such key (e.g. `X_umap`) contains a `(n_obs × k)` float32 matrix. These are referred to here using a placeholder `X_{suffix}`.",
          example: "X_tSNE;X_UMAP",
          multivalued: false,
          name: "X_{suffix}",
          range: "numpy.ndarray",
          required: true,
          title: "Embedding",
        },
      ],
      description: "",
      name: "dataset",
      title: "Dataset",
    },
    {
      attributes: [
        {
          annotations: {
            annDataLocation: "obs",
            cxg: "donor_id",
            tier: "Tier 1",
          },
          description:
            "This must be free-text that identifies a unique individual that data were derived from.",
          example: "CR_donor_1; MM_donor_1; LR_donor_2",
          multivalued: false,
          name: "donor_id",
          range: "string",
          required: true,
          title: "Donor ID",
        },
        {
          annotations: {
            annDataLocation: "obs",
            cxg: "organism_ontology_term_id",
            tier: "Tier 1",
          },
          description:
            "The name given to the type of organism, collected in NCBITaxon:0000 format.",
          example: "NCBITaxon:9606; NCBITaxon:10090",
          multivalued: false,
          name: "organism_ontology_term_id",
          range: "string",
          required: true,
          title: "Organism Ontology Term ID",
        },
        {
          annotations: {
            annDataLocation: "obs",
            tier: "Tier 1",
          },
          description:
            "Manner of death classification based on the Hardy Scale or 'unknown' or 'not applicable':\n* Category 1 = Violent and fast death Deaths due to accident, blunt force trauma or suicide, terminal phase estimated at < 10 min.\n* Category 2 = Fast death of natural causes -Sudden unexpected deaths of people who had been reasonably healthy, after a terminal phase estimated at < 1 hr (with sudden death from a myocardial infarction as a model cause of death for this category)\n* Category 3 = Intermediate death - Death after a terminal phase of 1 to 24 hrs (not classifiable as 2 or 4); patients who were ill but death was unexpected\n* Category 4 = Slow death - Death after a long illness, with a terminal phase longer than 1 day (commonly cancer or chronic pulmonary disease); deaths that are not unexpected\n* Category 0 =Ventilator Case - All cases on a ventilator immediately before death\n* Unknown = The cause of death is unknown\n* Not applicable = Subject is alive\n\n[Please leave this field as blank for embryonic/fetal tissue]",
          example: "1; 2; 3; 4; 0; unknown; not applicable",
          multivalued: false,
          name: "manner_of_death",
          range: "string",
          required: true,
          title: "Manner of Death",
        },
        {
          annotations: {
            annDataLocation: "obs",
            cxg: "sex_ontology_term_id",
            tier: "Tier 1",
          },
          description: "Reported sex of the donor.",
          example: "PATO:0000383 for female, PATO:0000384 for male",
          multivalued: false,
          name: "sex_ontology_term_id",
          range: "string",
          required: true,
          title: "Sex Ontology Term ID",
        },
      ],
      description: "",
      name: "donor",
      title: "Donor",
    },
    {
      attributes: [
        {
          annotations: {
            annDataLocation: "obs",
            tier: "Tier 1",
          },
          description:
            "Identification number of the sample. This is the fundamental unit of sampling the tissue (the specimen taken from the subject), which can be the same as the 'subject_ID', but is often different if multiple samples are taken from the same subject. Note: this is NOT a unit of multiplexing of donor samples, which should be stored in \"library\".",
          example: "SC24; SC25; SC28",
          multivalued: false,
          name: "sample_id",
          range: "string",
          required: true,
          title: "Sample ID",
        },
        {
          annotations: {
            annDataLocation: "obs",
            cxg: "tissue_ontology_term_id",
            tier: "Tier 1",
          },
          description:
            "The detailed anatomical location of the sample, please provide a specific UBERON term.",
          example: "UBERON:0001828; UBERON:0000966",
          multivalued: false,
          name: "tissue_ontology_term_id",
          range: "string",
          required: true,
          title: "Tissue Ontology Term ID",
        },
        {
          annotations: {
            annDataLocation: "obs",
            tier: "Tier 1",
          },
          description:
            "The detailed anatomical location of the sample - this does not have to tie to an ontology term.",
          example: "terminal ileum",
          multivalued: false,
          name: "tissue_free_text",
          range: "string",
          required: false,
          title: "Tissue Free Text",
        },
        {
          annotations: {
            annDataLocation: "obs",
            tier: "Tier 1",
          },
          description:
            "The study subgroup that the participant belongs to. This indicates whether the participant was a surgical donor (this includes patients providing blood samples or biopsies), a postmortem donor, or an organ donor.",
          example: "surgical donor; postmortem donor",
          multivalued: false,
          name: "sample_source",
          range: "string",
          required: true,
          title: "Sample Source",
        },
        {
          annotations: {
            annDataLocation: "obs",
            tier: "Tier 1",
          },
          description:
            "The method the sample was physically obtained from the donor.",
          example: "biopsy; brush; surgical resection",
          multivalued: false,
          name: "sample_collection_method",
          range: "string",
          required: true,
          title: "Sample Collection Method",
        },
        {
          annotations: {
            annDataLocation: "obs",
            cxg: "tissue_type",
            tier: "Tier 1",
          },
          description:
            'Whether the tissue is "tissue", "organoid", or "cell culture".',
          example: "tissue; organoid; cell culture",
          multivalued: false,
          name: "tissue_type",
          range: "string",
          required: true,
          title: "Tissue Type",
        },
        {
          annotations: {
            annDataLocation: "obs",
            tier: "Tier 1",
          },
          description:
            "Whether the site is considered healthy, diseased or adjacent to disease.",
          example: "healthy; diseased; adjacent",
          multivalued: false,
          name: "sampled_site_condition",
          range: "string",
          required: true,
          title: "Sampled Site Condition",
        },
        {
          annotations: {
            annDataLocation: "obs",
            cxg: "disease_ontology_term_id",
            tier: "Tier 1",
          },
          description: "Disease, if expected to impact the sample.",
          example: "MONDO:0005385; PATO:0000461",
          multivalued: false,
          name: "disease_ontology_term_id",
          range: "string",
          required: true,
          title: "Disease Ontology Term ID",
        },
        {
          annotations: {
            annDataLocation: "obs",
            tier: "Tier 1",
          },
          description:
            "Indicating if tissue was frozen, or not, at any point before library preparation.",
          example: "fresh; frozen at -70C",
          multivalued: false,
          name: "sample_preservation_method",
          range: "string",
          required: true,
          title: "Sample Preservation Method",
        },
        {
          annotations: {
            annDataLocation: "obs",
            cxg: "suspension_type",
            tier: "Tier 1",
          },
          description:
            "Specifies whether the sample contains single cells or single nuclei data.",
          example: "cell; nucleus; na",
          multivalued: false,
          name: "suspension_type",
          range: "string",
          required: true,
          title: "Suspension Type",
        },
        {
          annotations: {
            annDataLocation: "obs",
            tier: "Tier 1",
          },
          description:
            "This must be True if this is the canonical instance of this cellular observation and False if not. This is commonly False for meta-analyses reusing data or for secondary views of data.",
          example: "true; false",
          multivalued: false,
          name: "is_primary_data",
          range: "string",
          required: true,
          title: "Is Primary Data",
        },
        {
          annotations: {
            annDataLocation: "obs",
            tier: "Tier 1",
          },
          description: "Age of the subject.",
          example: "HsapDv:0000237; unknown",
          multivalued: false,
          name: "development_stage_ontology_term_id",
          range: "string",
          required: true,
          title: "Development Stage Ontology Term ID",
        },
        {
          annotations: {
            annDataLocation: "obs",
            tier: "Tier 1",
          },
          description:
            'The layer of the gut that was sequenced. This depends on the chemical digestion used. The chemical digestion methods should be collected in the "protocol" and "process" fields.',
          example: "EPI; LP; MUSC; SUB; MLN; PP",
          multivalued: false,
          name: "radial_tissue_term",
          range: "string",
          required: true,
          title: "Radial Tissue Term",
        },
        {
          annotations: {
            annDataLocation: "obs",
            tier: "Tier 1",
          },
          description:
            "Specifies the cell types targeted for enrichment or depletion beyond the selection of live cells.",
          example: "CL:0000057+; na",
          multivalued: false,
          name: "cell_enrichment",
          range: "string",
          required: true,
          title: "Cell Enrichment",
        },
        {
          annotations: {
            annDataLocation: "obs",
            tier: "Tier 1",
          },
          description:
            "Year of sample collection. Should not be detailed further(to exact month and day), to prevent identifiability.",
          example: "2018",
          multivalued: false,
          name: "sample_collection_year",
          range: "string",
          required: false,
          title: "Sample Collection Year",
        },
        {
          annotations: {
            annDataLocation: "obs",
            tier: "Tier 1",
          },
          description:
            "The pseudonymised name of the site where the sample was collected.",
          example: "AIDA_site_1; AIDA_site_2",
          multivalued: false,
          name: "sample_collection_site",
          range: "string",
          required: false,
          title: "Sample Collection Site",
        },
        {
          annotations: {
            annDataLocation: "obs",
            tier: "Tier 1",
          },
          description:
            "Time point when the sample was collected. This field is only needed if multiple samples from the same subject are available and collected at different time points. Sample collection dates (e.g. 23/09/22) cannot be used due to patient data protection, only relative time points should be used here (e.g. day3).",
          example: "sampleX_day1",
          multivalued: false,
          name: "sample_collection_relative_time_point",
          range: "string",
          required: false,
          title: "Sample Collection Relative Time Point",
        },
        {
          annotations: {
            annDataLocation: "obs",
            tier: "Tier 1",
          },
          description:
            "Estimated number of cells loaded for library construction.",
          example: "5000; 4000",
          multivalued: false,
          name: "cell_number_loaded",
          range: "integer",
          required: false,
          title: "Cell Number Loaded",
        },
        {
          annotations: {
            annDataLocation: "obs",
            tier: "Tier 1",
          },
          description:
            "If measured, per sample cell viability before library preparation (as a percentage).",
          example: "88; 95; 93.5",
          multivalued: false,
          name: "cell_viability_percentage",
          range: "decimal",
          required: false,
          title: "Cell Viability Percentage",
        },
        {
          annotations: {
            annDataLocation: "obs",
            tier: "Tier 1",
          },
          description: "Institution where the samples were processed.",
          example: "EMBL-EBI; Genome Institute of Singapore",
          multivalued: false,
          name: "institute",
          range: "string",
          required: true,
          title: "Institute",
        },
        {
          annotations: {
            annDataLocation: "obs",
            tier: "Tier 1",
          },
          description:
            "Encoding of author knowledge on any further information related to likely batch effects.",
          example: "Batch run by different personnel on different days",
          multivalued: false,
          name: "author_batch_notes",
          range: "string",
          required: false,
          title: "Author Batch Notes",
        },
      ],
      description: "",
      name: "sample",
      title: "Sample",
    },
    {
      attributes: [
        {
          annotations: {
            annDataLocation: "obs",
            tier: "Tier 1",
          },
          description:
            "The unique ID that is used to track libraries in the investigator's institution (should align with the publication).",
          example: "A24; NK_healthy_001",
          multivalued: false,
          name: "library_id",
          range: "string",
          required: true,
          title: "Library ID",
        },
        {
          annotations: {
            annDataLocation: "obs",
            tier: "Tier 1",
          },
          description:
            "The unique ID used to track libraries from one of the following public data repositories: EGAX*, GSM*, SRX*, ERX*, DRX, HRX, CRX",
          example: "GSM1684095",
          multivalued: false,
          name: "library_id_repository",
          range: "string",
          required: false,
          title: "Library ID Repository",
        },
        {
          annotations: {
            annDataLocation: "obs",
            tier: "Tier 1",
          },
          description:
            "Indicating which samples' libraries were prepared in the same chip/plate/etc., e.g. batch1, batch2.",
          example: "batch01; batch02",
          multivalued: false,
          name: "library_preparation_batch",
          range: "string",
          required: "strongly recommended",
          title: "Library Preparation Batch",
        },
        {
          annotations: {
            annDataLocation: "obs",
            tier: "Tier 1",
          },
          description:
            "The identifier (or accession number) that indicates which samples' libraries were sequenced in the same run.",
          example: "run1; NV0087",
          multivalued: false,
          name: "library_sequencing_run",
          range: "string",
          required: "strongly recommended",
          title: "Library Sequencing Run",
        },
      ],
      description: "",
      name: "library",
      title: "Library",
    },
    {
      attributes: [
        {
          annotations: {
            annDataLocation: "obs",
            tier: "Tier 1",
          },
          description:
            "Encoding of author intuition of cellular annotation in the dataset.",
          example: "Goblet cell; microglia",
          multivalued: false,
          name: "author_cell_type",
          range: "string",
          required: false,
          title: "Author Cell Type",
        },
        {
          annotations: {
            annDataLocation: "obs",
            tier: "Tier 1",
          },
          description: "Cell Ontology (CL) term.",
          example: "CL:0001204",
          multivalued: false,
          name: "cell_type_ontology_term_id",
          range: "string",
          required: false,
          title: "Cell Type Ontology Term ID",
        },
      ],
      description: "",
      name: "cell",
      title: "Cell",
    },
    {
      attributes: [
        {
          annotations: {
            annDataLocation: "var; raw.var",
            cxg: "index-of-pandasdataframe-1",
            tier: "Tier 1",
          },
          description:
            'If the feature is a gene then this MUST be an ENSEMBL term. If the feature is a RNA Spike-In Control Mix then this MUST be an ERCC Spike-In identifier (e.g. `"ERCC-0003"`).\n\nThe index of the `pandas.DataFrame` MUST contain unique identifiers for features. If present, the index of raw.var MUST be identical to the index of var.',
          multivalued: false,
          name: "index of pandas.DataFrame",
          range: "string",
          required: true,
          title: "Feature ID",
        },
        {
          annotations: {
            annDataLocation: "var; raw.var",
            cxg: "feature_is_filtered",
            tier: "Tier 1",
          },
          description:
            "When both a raw and normalized matrix are present, this MUST be `True` if the feature was filtered out in the normalized matrix (`X`) but is present in the raw matrix (`raw.X`). The value for all cells of the given feature in the normalized matrix MUST be `0`. If a feature contains all zeroes in the normalized matrix, then either the corresponding feature in the raw matrix MUST be all zeroes or the value MUST be `True`.",
          multivalued: false,
          name: "feature_is_filtered",
          range: "boolean",
          required: true,
          title: "Feature is Filtered",
        },
      ],
      description: "",
      name: "feature",
      title: "Feature",
    },
    {
      attributes: [
        {
          annotations: {
            annDataLocation: "X; raw.X",
            cxg: "x-matrix-layers",
            tier: "Tier 1",
          },
          description:
            "The data stored in the X data matrix is the data that is viewable in CELLxGENE Explorer.",
          multivalued: false,
          name: "X; raw.X",
          range: "oneOf(numpy.ndarray, scipy.sparse.csr_matrix)",
          required: true,
          title: "Matrix Layer",
        },
      ],
      description: "",
      name: "matrixLayers",
      title: "Matrix Layers",
    },
  ],
  description:
    "## Introduction\n\nTier 1 metadata extends the [CELLxGENE AnnData schema](https://chanzuckerberg.github.io/single-cell-curation/latest-schema.html) with the batch, sample, and sequencing details needed for atlas‑level batch correction, QC, and cross‑dataset integration.",
  name: "tier_1",
  title: "Tier 1 Metadata",
};
