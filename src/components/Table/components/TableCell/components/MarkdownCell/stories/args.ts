import { ComponentProps } from "react";
import { MarkdownCell } from "../markdownCell";
import { GetValue } from "./types";

export const DEFAULT_ARGS: Partial<ComponentProps<typeof MarkdownCell>> = {
  getValue: (() => ({
    values:
      '| Key | Annotator | Value |\n| --- | --- | --- |\n| `tissue_ontology_term_id` | Curator | categorical with `str` categories. This **MUST** be the UBERON or CL term that best describes the tissue the cell was derived from, depending on the sample type. |\n\n**Mapping guidance**\n\n| For | Use |\n| --- | --- |\n| Tissue | STRONGLY RECOMMENDED to be an UBERON term&nbsp;<br />(e.g. [`UBERON:0008930`](http://purl.obolibrary.org/obo/UBERON_0008930) for a *somatosensory cortex* tissue sample) |\n| Cell culture | MUST be a CL term appended with \\" (cell culture)\\"&nbsp;<br />(e.g. [`CL:0000057`](http://purl.obolibrary.org/obo/CL_0000057) **(cell culture)** for the *WTC-11* cell line) |\n| Organoid | MUST be an UBERON term appended with \\" (organoid)\\"&nbsp;<br />(e.g. [`UBERON:0000955`](http://purl.obolibrary.org/obo/UBERON_0000955) **(organoid)** for a *brain organoid*) |\n| Enriched / sorted / isolated cells from a tissue | MUST be an UBERON or CL term and **SHOULD NOT** use terms that do not capture the tissue of origin.<br /><br />• *CD3+ kidney cells* → [`UBERON:0002113`](https://www.ebi.ac.uk/ols/ontologies/uberon/terms?iri=http://purl.obolibrary.org/obo/UBERON_0002113) (*kidney*) instead of [`CL:000084`](https://www.ebi.ac.uk/ols/ontologies/cl/terms?iri=http://purl.obolibrary.org/obo/CL_0000084) (*T cell*).<br />• *EPCAM+ cervical cells* → [`CL:0000066`](https://www.ebi.ac.uk/ols/ontologies/cl/terms?iri=http://purl.obolibrary.org/obo/CL_0000066) (*epithelial cell* of the cervix). |\n\n---\n\nWhen a dataset is uploaded, the **cellxgene Data Portal** MUST automatically add the matching human-readable name for the corresponding ontology term to the `obs` dataframe. Curators **MUST NOT** annotate the following columns.\n\n### `assay`\n\n| Key | Annotator | Value |\n| --- | --- | --- |\n| `assay` | Data Portal | categorical with `str` categories. This **MUST** be the human-readable name assigned to the value of `assay_ontology_term_id`. |',
  })) as GetValue,
};

export const WITH_HTML_ARGS: Partial<ComponentProps<typeof MarkdownCell>> = {
  getValue: (() => ({
    values:
      "Hello <br />World <a href='https://www.example.com'>example link</a>",
  })) as GetValue,
};
