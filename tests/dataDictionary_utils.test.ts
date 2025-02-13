import {
  annotateCategoryConfig,
  annotateColumnConfig,
  annotateEntityConfig,
} from "../src/components/DataDictionary/common/utils";
import { SiteConfig } from "../src/config/entities";

describe("Data Dictionary", () => {
  it("annotates entity", () => {
    const key = "entity";

    // Create annotation for column and add to dummy annotation map.
    const annotation = {
      description: "description for entity",
      label: "entity",
    };
    const annotationsByKey = {
      [key]: annotation,
    };

    // Create dummy site config.
    const siteConfig = {
      entities: [
        {
          key,
          list: {
            columns: [{ id: "col150" }, { id: "col1" }],
          },
        },
      ],
    } as unknown as SiteConfig;

    // Annotate
    annotateEntityConfig(siteConfig, annotationsByKey);

    // Confirm entity is annotated.
    const entity = siteConfig.entities[0];
    expect(entity.annotation).toEqual(annotation);
  });

  it("annotates category config", () => {
    const key = "filter0";

    // Create annotation for column and add to dummy annotation map.
    const annotation = {
      description: "description for filter 0",
      label: "filter 0",
    };
    const annotationsByKey = {
      [key]: annotation,
    };

    // Create dummy site config.
    const siteConfig = {
      categoryGroupConfig: {
        categoryGroups: [
          {
            categoryConfigs: [
              {
                key,
                label: "filter 0",
              },
            ],
          },
        ],
      },
    } as unknown as SiteConfig;

    // Annotate
    annotateCategoryConfig(siteConfig, annotationsByKey);

    // Confirm filter is annotated.
    const categoryConfig =
      siteConfig.categoryGroupConfig?.categoryGroups[0].categoryConfigs[0];
    expect(categoryConfig?.annotation).toEqual(annotation);
  });

  it("annotates column", () => {
    const key = "col0";

    // Create annotation for column and add to dummy annotation map.
    const annotation = {
      description: "description for column 0",
      label: "column 0",
    };
    const annotationsByKey = {
      [key]: annotation,
    };

    // Create dummy site config.
    const siteConfig = {
      entities: [
        {
          list: {
            columns: [{ id: key }, { id: "col1" }],
          },
          name: "entity",
        },
      ],
    } as unknown as SiteConfig;

    // Annotate
    annotateColumnConfig(siteConfig, annotationsByKey);

    // Confirm column 0 is annotated and column 1 is not.
    const columns = siteConfig.entities[0].list.columns ?? [];
    expect((columns[0]?.meta as any)?.annotation).toEqual(annotation);
    expect((columns[1]?.meta as any)?.annotation).toBeUndefined();
  });
});
