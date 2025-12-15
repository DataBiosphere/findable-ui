export interface AiResponse {
  facets: Facet[];
}

export interface Facet {
  facet: string;
  selectedValues: SelectedValue[];
}

export interface SelectedValue {
  mention: string;
  term: string;
}
