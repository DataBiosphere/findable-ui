export interface AiResponse {
  facets: Facet[];
  query: string;
}

export interface Facet {
  facet: string;
  selectedValues: SelectedValue[];
}

export interface SelectedValue {
  mention: string;
  recognized: boolean;
  term: string;
}
