import { AzulTerm } from "../src/apis/azul/common/entities";
import { Filters } from "../src/common/entities";
import { bindEntitySearchResultsResponse } from "../src/hooks/useFileManifest/common/utils";
import { AlternateTermNamesMap } from "../src/providers/alternateTermNames/alternateTermNames";

describe("bindEntitySearchResultsResponse with alternate term names", () => {
  it("populates alternateName when map is provided", () => {
    const alternateTermNames: AlternateTermNamesMap = {
      species: {
        "Homo sapiens": "Human",
        "Mus musculus": "Mouse",
      },
    };

    const entityResponse = {
      termFacets: {
        species: {
          terms: [
            { count: 100, term: "Homo sapiens" } as AzulTerm,
            { count: 50, term: "Mus musculus" } as AzulTerm,
            { count: 25, term: "Rattus norvegicus" } as AzulTerm,
          ],
          total: 175,
        },
      },
    };

    const filters: Filters = [];

    const result = bindEntitySearchResultsResponse(
      entityResponse as any,
      filters,
      alternateTermNames
    );

    expect(result.facets).toHaveLength(1);
    const speciesFacet = result.facets[0];

    expect(speciesFacet.terms).toHaveLength(3);

    // Check first term has alternateName
    expect(speciesFacet.terms[0].name).toBe("Homo sapiens");
    expect(speciesFacet.terms[0].alternateName).toBe("Human");

    // Check second term has alternateName
    expect(speciesFacet.terms[1].name).toBe("Mus musculus");
    expect(speciesFacet.terms[1].alternateName).toBe("Mouse");

    // Check third term doesn't have alternateName
    expect(speciesFacet.terms[2].name).toBe("Rattus norvegicus");
    expect(speciesFacet.terms[2].alternateName).toBeUndefined();
  });

  it("works without alternate term names", () => {
    const entityResponse = {
      termFacets: {
        species: {
          terms: [
            { count: 100, term: "Homo sapiens" } as AzulTerm,
            { count: 50, term: "Mus musculus" } as AzulTerm,
          ],
          total: 150,
        },
      },
    };

    const filters: Filters = [];

    const result = bindEntitySearchResultsResponse(
      entityResponse as any,
      filters
    );

    expect(result.facets).toHaveLength(1);
    const speciesFacet = result.facets[0];

    expect(speciesFacet.terms).toHaveLength(2);

    // All terms should not have alternateName
    expect(speciesFacet.terms[0].name).toBe("Homo sapiens");
    expect(speciesFacet.terms[0].alternateName).toBeUndefined();

    expect(speciesFacet.terms[1].name).toBe("Mus musculus");
    expect(speciesFacet.terms[1].alternateName).toBeUndefined();
  });

  it("handles null alternate term names map", () => {
    const entityResponse = {
      termFacets: {
        species: {
          terms: [{ count: 100, term: "Homo sapiens" } as AzulTerm],
          total: 100,
        },
      },
    };

    const filters: Filters = [];

    const result = bindEntitySearchResultsResponse(
      entityResponse as any,
      filters,
      null
    );

    expect(result.facets).toHaveLength(1);
    expect(result.facets[0].terms[0].alternateName).toBeUndefined();
  });

  it("handles empty alternate term names map", () => {
    const entityResponse = {
      termFacets: {
        species: {
          terms: [{ count: 100, term: "Homo sapiens" } as AzulTerm],
          total: 100,
        },
      },
    };

    const filters: Filters = [];
    const alternateTermNames: AlternateTermNamesMap = {};

    const result = bindEntitySearchResultsResponse(
      entityResponse as any,
      filters,
      alternateTermNames
    );

    expect(result.facets).toHaveLength(1);
    expect(result.facets[0].terms[0].alternateName).toBeUndefined();
  });

  it("handles Unspecified terms correctly", () => {
    const alternateTermNames: AlternateTermNamesMap = {
      species: {
        Unspecified: "Unknown Species",
      },
    };

    const entityResponse = {
      termFacets: {
        species: {
          terms: [
            { count: 100, term: null } as AzulTerm, // null becomes "Unspecified"
          ],
          total: 100,
        },
      },
    };

    const filters: Filters = [];

    const result = bindEntitySearchResultsResponse(
      entityResponse as any,
      filters,
      alternateTermNames
    );

    expect(result.facets).toHaveLength(1);
    const speciesFacet = result.facets[0];

    // Term name should be "Unspecified" and alternateName should be looked up
    expect(speciesFacet.terms[0].name).toBe("Unspecified");
    expect(speciesFacet.terms[0].alternateName).toBe("Unknown Species");
  });
});
