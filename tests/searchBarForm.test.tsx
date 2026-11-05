import { render } from "@testing-library/react";
import { StyledForm } from "../src/components/Layout/components/Header/components/Content/components/Actions/components/Search/components/SearchBar/components/Form/form.styles";
import { getSelectorsSetting } from "./utils/emotionRules";

describe("SearchBar form styles", () => {
  // Inside the nested `.MuiInput-root` block, `&&` repeats the whole parent
  // selector (`.x .MuiInput-root.x .MuiInput-root`), which never matches.
  it("should style the focused input's placeholder", () => {
    const { container } = render(<StyledForm />);
    const form = container.firstElementChild as HTMLElement;
    expect(getSelectorsSetting("opacity", "1")).toContain(
      `.${form.classList[0]} .MuiInput-root.Mui-focused *::placeholder`,
    );
  });
});
