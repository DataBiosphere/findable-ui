# Data Modality Ontology Mapping

## Overview

AnVIL data modality terms are now mapped to standard ontologies while keeping familiar user-facing names.

## Mapping Strategy

Each data modality concept includes:

1. **AnVIL Term** - User-facing display name (what people see and search for)
2. **Broad modal Category** - High-level categorization from Broad Institute's modal ontology
3. **EDAM ID** - Canonical reference to EDAMONTOLOGY for interoperability

## Complete Mapping Table

| AnVIL Display Name                  | Broad modal Category        | EDAM ID   | EDAM URI                          | Notes                                                             |
| ----------------------------------- | --------------------------- | --------- | --------------------------------- | ----------------------------------------------------------------- |
| genome                              | genomic                     | data_3497 | http://edamontology.org/data_3497 | DNA sequence data                                                 |
| Whole Genome                        | whole genome                | data_3498 | http://edamontology.org/data_3498 | Whole genome sequencing data                                      |
| methylation                         | DNA methylation             | data_3207 | http://edamontology.org/data_3207 | Methylation data                                                  |
| single-cell RNA sequencing assay    | transcriptomic nontargeted  | data_3112 | http://edamontology.org/data_3112 | RNA-seq data (data_3935 exists for scRNA-seq but not widely used) |
| single-nucleus RNA sequencing assay | transcriptomic nontargeted  | data_3112 | http://edamontology.org/data_3112 | RNA-seq data                                                      |
| single-cell ATAC-seq                | DNA chromatin accessibility | data_3998 | http://edamontology.org/data_3998 | ATAC-seq data                                                     |
| single-nucleus ATAC-seq             | DNA chromatin accessibility | data_3998 | http://edamontology.org/data_3998 | ATAC-seq data                                                     |
| PacBio Whole Genome Sequencing      | whole genome                | data_3498 | http://edamontology.org/data_3498 | PacBio is a platform, not in standard ontologies                  |
| SHARE-seq                           | transcriptomic nontargeted  | data_3112 | http://edamontology.org/data_3112 | SHARE-seq is multimodal (RNA+ATAC)                                |
| None                                | -                           | -         | -                                 | Special value for missing data                                    |
| Unspecified                         | -                           | -         | -                                 | Special value for unspecified data                                |

## Broad modal Categories

The Broad modal ontology provides high-level groupings:

- **genomic** - Genome-related data
- **whole genome** - Whole genome sequencing
- **transcriptomic nontargeted** - RNA sequencing without specific target
- **DNA methylation** - Methylation profiling
- **DNA chromatin accessibility** - ATAC-seq and similar assays

**Source**: https://github.com/broadinstitute/modal/blob/main/DataModality.ttl

## EDAM References

EDAMONTOLOGY provides canonical IDs for bioinformatics data types:

- **data_3497** - DNA sequence data (generic)
- **data_3498** - Whole genome sequencing data
- **data_3112** - RNA-seq data
- **data_3207** - Methylation data
- **data_3998** - ATAC-seq data

**Source**: http://edamontology.org/

## Usage

### For Search/Display

- **Show to users**: AnVIL display names ("single-cell RNA sequencing assay")
- **Search by**: All synonyms in the concept (scRNA-seq, scrna seq, etc.)

### For Categorization

- **Group by modal category**: Filter all "transcriptomic nontargeted" data
- **Use EDAM for**: API interoperability, data exports, metadata standards

### API Response Example

```json
{
  "term": "single-cell RNA sequencing assay",
  "display_name": "single-cell RNA sequencing assay",
  "ontology": {
    "broad_modal": {
      "category": "transcriptomic nontargeted",
      "uri": "https://datamodel.terra.bio/BioCoreTerms#0000026"
    },
    "edam": {
      "id": "data_3112",
      "uri": "http://edamontology.org/data_3112"
    }
  }
}
```

## Benefits

1. **User-Friendly** - Keep familiar AnVIL terminology
2. **Standardized** - Map to recognized ontologies (EDAM)
3. **Categorizable** - Group by Broad modal categories
4. **Interoperable** - EDAM IDs enable tool integration
5. **Searchable** - All synonym variants still work

## Future Enhancements

- Add OBI (Ontology for Biomedical Investigations) mappings for assay types
- Map technology-specific terms (PacBio, Illumina) to platform ontologies
- Create hierarchical faceting using modal categories
- Export metadata using EDAM terms for GA4GH compliance
