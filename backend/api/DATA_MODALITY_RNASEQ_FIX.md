# RNA-seq EDAM Mapping Fix and Bulk RNA-seq Addition

## Date

2025-12-22

## Problem

1. **Incorrect EDAM mapping**: Single-cell and single-nucleus RNA-seq concepts were mapped to EDAM data_3112 which is specifically for **microarray data** ("Gene expression matrix", "Normalised microarray data").

2. **Missing bulk RNA-seq**: The database only contained single-cell and single-nucleus RNA-seq, but was missing plain bulk RNA sequencing.

## Investigation

Searched EDAM ontology via OLS API to find the correct data type for RNA-seq:

- **data_3112** = "Gene expression matrix" - specifically for microarray normalized data ❌
- **data_2603** = "Expression data" - general term that covers RNA-seq, microarray, and other expression profiling ✅

EDAM data_2603 has excellent RNA-seq synonyms:

- RNA-seq data
- RNA profile / RNA quantification data
- Transcriptome profile / Transcriptome quantification data
- mRNA profile / mRNA quantification data
- Gene expression data

## Solution

### 1. Fixed Existing EDAM Mappings

Updated two concepts from data_3112 → data_2603:

- single-cell RNA sequencing assay
- single-nucleus RNA sequencing assay

### 2. Added Bulk RNA-seq Concept

Created new concept "RNA sequencing assay" with:

- **Display name**: RNA sequencing assay
- **EDAM**: data_2603 (Expression data)
- **Broad modal**: transcriptomic nontargeted
- **Synonyms**:
  - rna sequencing assay
  - rna-seq, rna seq, rnaseq
  - bulk rna-seq, bulk rna sequencing, bulk rnaseq
  - transcriptome sequencing, whole transcriptome sequencing
  - mrna sequencing, mrna-seq

### 3. Added Test Coverage

Added 6 new test cases (dm_027-dm_032) covering:

- Exact term matching
- Common abbreviations (rna-seq)
- Space variants (rna seq)
- Bulk qualifier (bulk rna-seq)
- Alternative terms (transcriptome sequencing, mrna sequencing)

## Results

**Before**: 26/26 tests passing (only single-cell/single-nucleus RNA-seq)

**After**: 32/32 tests passing (100%) including bulk RNA-seq

All test categories at 100%:

- Basic: 9/9
- Abbreviation: 8/8
- Synonym: 12/12
- Edge case: 3/3

## Files Modified

1. `scripts/fix_rnaseq_edam_and_add_bulk.py` - Fix script
2. `opensearch/concepts-with-synonyms.json` - Updated EDAM mappings and added bulk concept
3. `evals/datasets/data_modality_tests.csv` - Added 6 bulk RNA-seq tests
4. `evals/results/baseline/data_modality_tests_baseline.json` - Updated baseline

## OpenSearch Reload

**Important**: After modifying concepts, OpenSearch must be reloaded:

```bash
cd /Users/dave/projects/findable-ui/backend/opensearch
./load-concepts.py --file concepts-with-synonyms.json --clear
```

## Notes

- EDAM data_3935 (mentioned in original notes) does not exist (404)
- data_2603 is the most appropriate EDAM term for all RNA-seq data (bulk, single-cell, single-nucleus)
- All children of data_2603 are microarray-specific, but the parent term correctly encompasses RNA-seq via its synonyms
