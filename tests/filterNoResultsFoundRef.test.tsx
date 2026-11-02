import { render } from "@testing-library/react";
import { createRef } from "react";
import { FilterNoResultsFound } from "../src/components/Filter/components/FilterNoResultsFound/filterNoResultsFound";

describe("FilterNoResultsFound ref", () => {
  // React 19 passes ref as a regular prop, so with forwardRef removed the ref
  // must still reach the root element. The search-all-filters list reads its
  // height through this ref to size the row.
  it("should forward ref to the root element", () => {
    const ref = createRef<HTMLDivElement>();
    const { container } = render(<FilterNoResultsFound ref={ref} />);
    expect(ref.current).toBe(container.firstChild);
  });
});
