import { CHIP_PRESETS } from "../src/contracts/mui/Chip/presets";
import { CHIP_VARIANTS } from "../src/contracts/mui/Chip/theme";

describe("CHIP_PRESETS", () => {
  it("should have only the current preset names", () => {
    expect(Object.keys(CHIP_PRESETS).sort()).toEqual(["DEFAULT_OUTLINED"]);
  });

  it.each(Object.entries(CHIP_PRESETS))(
    "should give %s a color the theme styles, without conflicting with that entry",
    (_, preset) => {
      // As MUI matches a variant: every prop the entry names has the preset's value. Size and variant are not checked
      // unless the entry names them.
      const styled = CHIP_VARIANTS.some(
        ({ props }) =>
          props.color === preset.color &&
          Object.entries(props).every(
            ([key, value]) => preset[key as keyof typeof preset] === value,
          ),
      );
      expect(styled).toBe(true);
    },
  );
});
