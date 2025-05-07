import { jest } from "@jest/globals";
import { composeStories } from "@storybook/react";
import { render, screen } from "@testing-library/react";
import React, { FormEvent } from "react";
import { VIEW_KIND } from "../src/common/categories/views/types";
import {
  OnSubmitFn,
  RANGE_OPERATOR,
  SubmitParams,
} from "../src/components/Filter/components/FilterRange/hooks/UseFilterRange/types";

const ON_SUBMIT = jest.fn();

const HANDLE_SUBMIT = jest.fn(
  (_: OnSubmitFn, parameters: SubmitParams) =>
    (e: FormEvent): void => {
      e.preventDefault();
      ON_SUBMIT(
        parameters.categoryKey,
        [0, 2100],
        true,
        parameters.categorySection,
        VIEW_KIND.RANGE
      );
    }
);

jest.unstable_mockModule(
  "../src/components/Filter/components/FilterRange/hooks/UseFilterRange/hook",
  () => ({
    useFilterRange: jest.fn(() => ({
      clearErrors: jest.fn(),
      formState: { errors: {} },
      handleSubmit: HANDLE_SUBMIT,
      onChange: jest.fn(),
      value: RANGE_OPERATOR.BETWEEN,
    })),
  })
);

const stories = await import(
  "../src/components/Filter/components/FilterRange/stories/filterRange.stories"
);

const { Default } = composeStories(stories);

describe("FilterRangeWithMockedHook", () => {
  describe("submit button", () => {
    beforeEach(() => {
      render(<Default />);
    });
    it("has a submit button that can be clicked", () => {
      screen.getByText("Filter").click();
      expect(ON_SUBMIT).toHaveBeenCalledTimes(1);
    });
  });
});
