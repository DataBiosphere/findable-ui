import { jest } from "@jest/globals";
import { composeStories } from "@storybook/react";
import { render, screen } from "@testing-library/react";
import React, { FormEvent } from "react";
import { RANGE_OPERATOR } from "../src/components/Filter/components/FilterRange/types";

const ON_SUBMIT = jest.fn();

jest.unstable_mockModule(
  "../src/components/Filter/components/FilterRange/hooks/UseFilterRange/hook",
  () => ({
    useFilterRange: jest.fn(() => ({
      onChange: jest.fn(),
      onSubmit: (e: FormEvent): void => {
        e.preventDefault();
        ON_SUBMIT(e);
      },
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
