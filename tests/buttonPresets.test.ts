import { BUTTON_PROPS } from "../src/components/common/Button/constants";

describe("BUTTON_PROPS", () => {
  it("should have only the current preset names", () => {
    expect(Object.keys(BUTTON_PROPS).sort()).toEqual([
      "PRIMARY_CONTAINED",
      "PRIMARY_LARGE_CONTAINED",
      "PRIMARY_MEDIUM_CONTAINED",
      "PRIMARY_TEXT",
      "SECONDARY_LARGE_OUTLINED",
      "SECONDARY_MEDIUM_OUTLINED",
      "SECONDARY_OUTLINED",
    ]);
  });

  it("should not compile references to the removed contained secondary presets", () => {
    // `npm run test-compile` fails if any of these names type-checks again.
    const removed = [
      // @ts-expect-error -- renamed SECONDARY_OUTLINED
      BUTTON_PROPS.SECONDARY_CONTAINED,
      // @ts-expect-error -- renamed SECONDARY_LARGE_OUTLINED
      BUTTON_PROPS.SECONDARY_LARGE_CONTAINED,
      // @ts-expect-error -- renamed SECONDARY_MEDIUM_OUTLINED
      BUTTON_PROPS.SECONDARY_MEDIUM_CONTAINED,
    ];
    expect(removed).toEqual([undefined, undefined, undefined]);
  });
});
