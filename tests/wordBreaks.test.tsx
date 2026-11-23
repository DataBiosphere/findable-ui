import { render } from "@testing-library/react";
import { addWordBreaks } from "../src/components/Table/components/TableCell/common/wordBreaks";

describe("addWordBreaks", () => {
  it("adds a line break opportunity after each slash", () => {
    const text = "human-pangenomics/working/NA18959_2_dorado0.5.3.bam";
    const { container } = render(<>{addWordBreaks(text)}</>);
    expect(container.textContent).toBe(text);
    expect(container.querySelectorAll("wbr")).toHaveLength(2);
  });

  it.each([["NA18959_2_dorado0.5.3.bam"]])(
    "returns %j unchanged when it has no slash",
    (text) => {
      expect(addWordBreaks(text)).toBe(text);
    },
  );
});
