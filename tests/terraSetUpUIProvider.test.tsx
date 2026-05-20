import { act, render, screen } from "@testing-library/react";
import { JSX } from "react";
import { useTerraSetUpUI } from "../src/terra/setUpUI/provider/hook";
import { TerraSetUpUIProvider } from "../src/terra/setUpUI/provider/provider";

const TEST_ID_STATE = "terra-set-up-ui-state";
const TEST_ID_TOGGLE = "terra-set-up-ui-toggle";
const TEXT_OPEN = "open";
const TEXT_CLOSED = "closed";

function Consumer(): JSX.Element {
  const { isOpen, onChange } = useTerraSetUpUI();
  return (
    <>
      <div data-testid={TEST_ID_STATE}>{isOpen ? TEXT_OPEN : TEXT_CLOSED}</div>
      <button data-testid={TEST_ID_TOGGLE} onClick={onChange}>
        toggle
      </button>
    </>
  );
}

describe("TerraSetUpUIProvider", () => {
  it("renders children with the initial open state", () => {
    render(
      <TerraSetUpUIProvider>
        <Consumer />
      </TerraSetUpUIProvider>,
    );
    expect(screen.getByTestId(TEST_ID_STATE).textContent).toEqual(TEXT_OPEN);
  });

  it("toggles isOpen when onChange is invoked", () => {
    render(
      <TerraSetUpUIProvider>
        <Consumer />
      </TerraSetUpUIProvider>,
    );

    expect(screen.getByTestId(TEST_ID_STATE).textContent).toEqual(TEXT_OPEN);

    act(() => {
      screen.getByTestId(TEST_ID_TOGGLE).click();
    });
    expect(screen.getByTestId(TEST_ID_STATE).textContent).toEqual(TEXT_CLOSED);

    act(() => {
      screen.getByTestId(TEST_ID_TOGGLE).click();
    });
    expect(screen.getByTestId(TEST_ID_STATE).textContent).toEqual(TEXT_OPEN);
  });
});
