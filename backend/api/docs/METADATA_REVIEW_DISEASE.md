# Disease Facet Metadata Review

This document summarizes observations and recommendations for improving the `diagnoses.disease` facet metadata to enhance search accuracy and ontology alignment.

## Overview

| Metric                 | Count |
| ---------------------- | ----- |
| Total disease concepts | 796   |
| HP (phenotype) codes   | 375   |
| OMIM codes             | 191   |
| ORPHA codes            | 98    |
| MONDO-mapped terms     | 76    |

## Observations

### 1. HP Terms in Disease Facet

**Observation:** Approximately 47% of disease facet values are HP (Human Phenotype Ontology) codes. HP is designed for phenotypic abnormalities, symptoms, and clinical findings rather than diseases.

**Examples of phenotypes currently in disease facet:**

| Term                       | HP Code    | Type                      |
| -------------------------- | ---------- | ------------------------- |
| Abnormal brain morphology  | HP:0012443 | Morphological abnormality |
| Abnormal kidney morphology | HP:0000077 | Morphological abnormality |
| Fatigue                    | HP:0012378 | Symptom                   |
| Limb muscle weakness       | HP:0003690 | Clinical finding          |
| Proteinuria                | HP:0000093 | Laboratory finding        |

**Some HP terms do represent disease-like conditions:**

| Term                                     | HP Code    | Notes                      |
| ---------------------------------------- | ---------- | -------------------------- |
| Attention deficit hyperactivity disorder | HP:0007018 | Could map to MONDO         |
| Type I diabetes mellitus                 | HP:0100651 | Could map to MONDO:0005147 |
| Congenital nephrotic syndrome            | HP:0008677 | Could map to MONDO         |

**Recommendation:** Consider reviewing HP terms to determine if they should:

- Remain in disease (if they represent actual diseases with MONDO equivalents)
- Move to a phenotype facet (if they represent symptoms/findings)
- Map to MONDO IDs where appropriate disease equivalents exist

### 2. Composite Terms

**Observation:** Five disease values contain "or" suggesting they may represent multiple conditions grouped together.

| Current Term                     | Ontology ID | Potential Mapping                                      |
| -------------------------------- | ----------- | ------------------------------------------------------ |
| bladder or urinary tract cancer  | None        | MONDO:0004648 (urinary system cancer)                  |
| cns or brain cancer              | None        | MONDO:0002598 (CNS cancer)                             |
| esophageal or stomach cancer     | None        | Could split or map to upper GI cancer                  |
| ovarian or fallopian tube cancer | None        | Could map to MONDO:0002794 (ovarian cancer) + separate |
| vulvar or vaginal cancer         | None        | Could split into separate terms                        |

**Recommendation:** Review whether these should:

- Map to a parent ontology term that encompasses both concepts
- Split into separate, more specific terms
- Retain as-is with proper MONDO mapping if a suitable umbrella term exists

### 3. Unmapped OMIM/ORPHA Codes

**Observation:** 191 OMIM and 98 ORPHA codes appear as raw identifiers without human-readable names or MONDO mappings.

**Examples:**

- `omim:117000` → Could be resolved to disease name via OMIM API
- `orpha:319` → Could be resolved to disease name via Orphanet
- `omim:259700;omim:618845` → Multiple codes in single field

**Recommendation:**

- Resolve OMIM/ORPHA codes to their canonical names for improved searchability
- Map to MONDO where cross-references exist (MONDO maintains xrefs to OMIM/ORPHA)
- Address multi-code entries (e.g., `omim:259700;omim:618845`) by either splitting or selecting primary

### 4. Terms Without Ontology Mapping

**Observation:** 53 human-readable disease terms lack ontology mappings.

**Examples:**

| Term                       | Notes                                           |
| -------------------------- | ----------------------------------------------- |
| alzheimer's disease        | Could map to MONDO:0004975                      |
| coronary arteriosclerosis  | Could map to MONDO:0005308                      |
| attention deficit disorder | Could map to MONDO:0007743                      |
| blood cancer               | Could map to MONDO:0002334 (hematologic cancer) |
| bowel cancer               | Could map to MONDO:0024331 (intestinal cancer)  |

**Recommendation:** Map these terms to MONDO IDs to enable:

- Consistent hierarchy-based search
- Synonym expansion
- Integration with broader biomedical knowledge graphs

## Summary of Recommendations

1. **Phenotype Review:** Audit HP codes to distinguish true diseases from phenotypes/symptoms
2. **Composite Terms:** Resolve "or" terms to proper ontology mappings or split appropriately
3. **Code Resolution:** Resolve OMIM/ORPHA codes to human-readable names with MONDO mappings
4. **Gap Filling:** Add MONDO mappings for unmapped disease terms
5. **Consistency:** Consider establishing a policy on disease vs. phenotype facet membership

## Benefits of Addressing These Items

- **Improved Search:** Users searching "cancer" would find all cancer types via hierarchy
- **Better UX:** Human-readable names instead of opaque codes like "omim:117000"
- **Interoperability:** MONDO mappings enable integration with external resources
- **Data Quality:** Clear ontology mappings reduce ambiguity in research queries

---

_Document generated: 2026-01-21_
