import type { SerializedStyles, Theme } from "@emotion/react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { PROPERTY } from "../../hooks/useHtmlStyle/constants";
import {
  bpDown1024,
  bpDownSm,
  bpUp1024,
} from "../../styles/common/mixins/breakpoints";
import {
  FILTERS_FALLBACK_HEIGHT,
  LAYOUT_SPACING,
  TITLE_BOTTOM,
} from "./components/Layout/constants";

/**
 * Server-rendered scroll-padding-top, so from 1024px up a deep link clears the
 * sticky header, title and filters on first load. Until they are measured, the
 * header falls back to its height without announcements and the filters to
 * their height without tags. Below 1024px the title and filters scroll with the
 * page, so the header's own scroll-padding-top applies. `:root` outranks the
 * header's `html` rule.
 * @param theme - MUI theme.
 * @returns Global scroll-padding-top styles.
 */
export const scrollPadding = (theme: Theme): SerializedStyles => css`
  ${bpUp1024({ theme })} {
    :root {
      scroll-padding-top: calc(
        ${TITLE_BOTTOM} +
          var(
            ${PROPERTY.DATA_DICTIONARY_FILTERS_HEIGHT},
            ${FILTERS_FALLBACK_HEIGHT}px
          )
      );
    }
  }
`;

export const View = styled("div")`
  column-gap: 24px;
  display: grid;
  flex: 1;
  grid-template-areas:
    "title title"
    "outline filters"
    "outline entities";
  grid-template-columns: 242px 1fr;
  grid-template-rows: ${LAYOUT_SPACING.TITLE_HEIGHT}px auto 1fr;
  margin: 0 24px;
  position: relative;

  ${bpDown1024} {
    grid-template-areas:
      "title"
      "filters"
      "entities";
    grid-template-columns: 1fr;
    grid-template-rows: none;
    margin: 0 16px;
  }

  ${bpDownSm} {
    margin: 0;
  }
`;
