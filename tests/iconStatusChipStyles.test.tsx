import styled from "@emotion/styled";
import { type Theme, ThemeProvider } from "@mui/material";
import { render } from "@testing-library/react";
import type { ComponentType } from "react";
import type { CustomSVGIconProps } from "../src/components/common/CustomIcon/common/entities";
import { ErrorIcon } from "../src/contracts/cc/icons/ErrorIcon/errorIcon";
import { InProgressIcon } from "../src/contracts/cc/icons/InProgressIcon/inProgressIcon";
import { PartiallyCompleteIcon } from "../src/contracts/cc/icons/PartiallyCompleteIcon/partiallyCompleteIcon";
import { RequiredIcon } from "../src/contracts/cc/icons/RequiredIcon/requiredIcon";
import { SuccessIcon } from "../src/contracts/cc/icons/SuccessIcon/successIcon";
import { ICON_STATUS_CHIP_PROPS } from "../src/contracts/cc/IconStatusChip/constants";
import { IconStatusChip } from "../src/contracts/cc/IconStatusChip/iconStatusChip";
import type { IconStatus } from "../src/contracts/cc/IconStatusChip/types";
import { StatusChip } from "../src/contracts/cc/StatusChip/statusChip";
import type { StatusChipColor } from "../src/contracts/cc/StatusChip/types";
import { CHIP_PROPS } from "../src/contracts/mui/Chip/constants";
import { createAppTheme } from "../src/theme/theme";
import { renderChipStyles } from "./utils/chipStyles";
import {
  getEmotionStyles,
  pickStyles,
  recordInsertedRules,
  type ResolvedStyles,
} from "./utils/emotionStyles";

const LABEL = "Label";

const STATUS = ICON_STATUS_CHIP_PROPS.STATUS;

// The status → colour, icon and name table, written out rather than read from the component's constants, so swapping two
// entries there fails these tests. The tracker's IconStatusBadge pairs them the same way.
const EXPECTED: Record<
  IconStatus,
  {
    Icon: ComponentType<CustomSVGIconProps>;
    color: StatusChipColor;
    colorClass: string;
    name: string;
  }
> = {
  [STATUS.BLOCKED]: {
    Icon: ErrorIcon,
    color: "error",
    colorClass: "MuiChip-colorError",
    name: "Blocked",
  },
  [STATUS.DONE]: {
    Icon: SuccessIcon,
    color: "success",
    colorClass: "MuiChip-colorSuccess",
    name: "Done",
  },
  [STATUS.IN_PROGRESS]: {
    Icon: InProgressIcon,
    color: "caution",
    colorClass: "MuiChip-colorCaution",
    name: "In progress",
  },
  [STATUS.PARTIALLY_COMPLETE]: {
    Icon: PartiallyCompleteIcon,
    color: "warning",
    colorClass: "MuiChip-colorWarning",
    name: "Partially complete",
  },
  [STATUS.REQUIRED]: {
    Icon: RequiredIcon,
    color: "default",
    colorClass: "MuiChip-colorDefault",
    name: "Required",
  },
};

// The icon rules IconStatusChip adds to StatusChip's chip.
const ICON_KEYS = ["& .MuiChip-icon"];

// An app restyling one chip's icon through `className`.
const LargerIconStatusChip = styled(IconStatusChip)`
  .MuiChip-icon {
    font-size: 16px;
    height: 16px;
    width: 16px;
  }
`;

const THEME = createAppTheme();

recordInsertedRules();

/**
 * Returns resolved styles without the icon rules IconStatusChip adds.
 * @param styles - Resolved styles keyed by selector.
 * @returns The styles without the icon selectors.
 */
function omitIconRules(styles: ResolvedStyles): ResolvedStyles {
  return Object.fromEntries(
    Object.entries(styles).filter(([key]) => !ICON_KEYS.includes(key)),
  );
}

/**
 * Renders an IconStatusChip under findable-ui's theme and returns its root element.
 * @param status - Status to render.
 * @returns The chip's root element.
 */
function renderChipRoot(status: IconStatus): Element {
  return render(
    <ThemeProvider theme={THEME}>
      <IconStatusChip label={LABEL} status={status} />
    </ThemeProvider>,
  ).container.querySelector(".MuiChip-root") as Element;
}

describe("IconStatusChip status", () => {
  for (const status of Object.values(STATUS)) {
    const { color, colorClass, Icon, name } = EXPECTED[status];

    it(`should draw ${status} in ${color} with its icon`, () => {
      const root = renderChipRoot(status);
      const icon = render(<Icon />).container.querySelector("svg") as Element;
      expect(root.classList.contains(colorClass)).toBe(true);
      expect(root.querySelector(".MuiChip-icon")?.innerHTML).toBe(
        icon.innerHTML,
      );
    });

    it(`should read ${status} as "${name}" before the label`, () => {
      const root = renderChipRoot(status);
      expect(root.querySelector(".MuiChip-label")?.textContent).toBe(
        `${name}: ${LABEL}`,
      );
    });

    it(`should draw ${status} as StatusChip draws ${color}, apart from the icon`, () => {
      const chip = renderChipStyles(
        <ThemeProvider theme={THEME}>
          <IconStatusChip label={LABEL} status={status} />
        </ThemeProvider>,
      );
      const statusChip = renderChipStyles(
        <ThemeProvider theme={THEME}>
          <StatusChip color={color} label={LABEL} />
        </ThemeProvider>,
      );
      expect(omitIconRules(chip.root)).toEqual(omitIconRules(statusChip.root));
      expect(chip.label).toEqual(statusChip.label);
    });
  }

  it("should hide the status's name on screen", () => {
    const name = renderChipRoot(STATUS.DONE).querySelector(
      ".MuiChip-label > span",
    ) as Element;
    expect(
      pickStyles(getEmotionStyles(name), "&", [
        "clip",
        "height",
        "overflow",
        "position",
        "width",
      ]),
    ).toEqual({
      clip: "rect(0 0 0 0)",
      height: "1px",
      overflow: "hidden",
      position: "absolute",
      width: "1px",
    });
  });

  it("should keep the status off the DOM", () => {
    expect(renderChipRoot(STATUS.DONE).hasAttribute("status")).toBe(false);
  });
});

describe("IconStatusChip icon", () => {
  it("should draw the icon at 12px, 4px from the edge and the label", () => {
    const root = renderChipRoot(STATUS.DONE);
    expect(
      pickStyles(getEmotionStyles(root), "& .MuiChip-icon", [
        "font-size",
        "height",
        "margin",
        "width",
      ]),
    ).toEqual({
      "font-size": "12px",
      height: "12px",
      margin: "0 -4px 0 4px",
      width: "12px",
    });
    // The icon's own `xsmall` size, which the chip's rule wins over.
    const icon = root.querySelector(".MuiChip-icon") as Element;
    expect(getEmotionStyles(icon)["&"]["font-size"]).toBe("18px");
  });

  it("should give the default chip's icon the chip's text colour, not MUI's grey", () => {
    const icon = renderChipRoot(STATUS.REQUIRED).querySelector(
      ".MuiChip-icon",
    ) as Element;
    // MUI's grey applies to an icon that carries this class; an icon with `color="inherit"` doesn't get it.
    expect(icon.classList.contains("MuiChip-iconColorDefault")).toBe(false);
    expect(icon.classList.contains("MuiChip-iconColorInherit")).toBe(true);
  });

  it("should let a className change the icon size", () => {
    const root = render(
      <ThemeProvider theme={THEME}>
        <LargerIconStatusChip label={LABEL} status={STATUS.DONE} />
      </ThemeProvider>,
    ).container.querySelector(".MuiChip-root") as Element;
    expect(getEmotionStyles(root)["& .MuiChip-icon"]["font-size"]).toBe("16px");
  });
});

describe("IconStatusChip color, size and variant", () => {
  /**
   * Renders an IconStatusChip, with any extra props, under the given theme.
   * @param theme - Theme to render with.
   * @param extraProps - Props an untyped caller could still pass, such as color, size or variant.
   * @returns Resolved styles for the root and label elements.
   */
  function renderIconStatusChipStyles(
    theme: Theme,
    extraProps: object = {},
  ): Record<string, ResolvedStyles> {
    return renderChipStyles(
      <ThemeProvider theme={theme}>
        <IconStatusChip {...extraProps} label={LABEL} status={STATUS.DONE} />
      </ThemeProvider>,
    );
  }

  for (const size of [CHIP_PROPS.SIZE.SMALL, CHIP_PROPS.SIZE.MEDIUM]) {
    for (const variant of [
      CHIP_PROPS.VARIANT.FILLED,
      CHIP_PROPS.VARIANT.OUTLINED,
    ]) {
      it(`should keep its styles when ${size} ${variant} is passed in`, () => {
        // The props type leaves size and variant out; an untyped caller could still pass them.
        expect(renderIconStatusChipStyles(THEME, { size, variant })).toEqual(
          renderIconStatusChipStyles(THEME),
        );
      });

      it(`should keep its styles when the theme's MuiChip defaults are ${size} ${variant}`, () => {
        const theme = createAppTheme({
          components: { MuiChip: { defaultProps: { size, variant } } },
        });
        expect(renderIconStatusChipStyles(theme)).toEqual(
          renderIconStatusChipStyles(THEME),
        );
      });
    }
  }

  it("should keep its styles when the theme's MuiChip default color changes", () => {
    const theme = createAppTheme({
      components: {
        MuiChip: { defaultProps: { color: CHIP_PROPS.COLOR.PRIMARY } },
      },
    });
    expect(renderIconStatusChipStyles(theme)).toEqual(
      renderIconStatusChipStyles(THEME),
    );
  });

  it("should keep its styles when a color is passed in", () => {
    // The props type leaves color out; an untyped caller could still pass it.
    expect(
      renderIconStatusChipStyles(THEME, { color: CHIP_PROPS.COLOR.PRIMARY }),
    ).toEqual(renderIconStatusChipStyles(THEME));
  });
});
