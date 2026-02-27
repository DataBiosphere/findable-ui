import { jest } from "@jest/globals";
import { renderHook } from "@testing-library/react";
import { KeyboardEvent } from "react";
import { Message, MESSAGE_TYPE } from "../src/views/ResearchView/state/types";

/**
 * Mock input element for keyboard event testing.
 */
interface MockInputElement {
  form: { requestSubmit: jest.Mock } | null;
  placeholder: string;
  value: string;
}

// Mock useChatState
const mockUseChatState = jest.fn();

jest.unstable_mockModule(
  "../src/views/ResearchView/state/hooks/UseChatState/hook",
  () => ({ useChatState: mockUseChatState }),
);

const { useKeyShortCuts } =
  await import("../src/views/ResearchView/assistant/components/Input/hooks/UseKeyShortCuts/hook");

/**
 * Creates a mock keyboard event for testing.
 * @param key - The key pressed.
 * @param inputEl - The mock input element.
 * @param shiftKey - Whether the shift key is pressed.
 * @returns A mock KeyboardEvent.
 */
function createMockKeyEvent(
  key: string,
  inputEl: MockInputElement,
  shiftKey = false,
): KeyboardEvent<HTMLInputElement> {
  return {
    currentTarget: inputEl,
    key,
    preventDefault: jest.fn(),
    shiftKey,
  } as unknown as KeyboardEvent<HTMLInputElement>;
}

/**
 * Creates a mock input element for testing.
 * @param value - Initial input value.
 * @param placeholder - Placeholder text.
 * @returns A mock input element.
 */
function createMockInputEl(value = "", placeholder = ""): MockInputElement {
  return {
    form: { requestSubmit: jest.fn() },
    placeholder,
    value,
  };
}

/**
 * Creates a user message for testing.
 * @param text - The message text.
 * @returns A user message object.
 */
function createUserMessage(text: string): Message {
  return {
    createdAt: Date.now(),
    text,
    type: MESSAGE_TYPE.USER,
  };
}

/**
 * Creates a prompt message for testing.
 * @param text - The message text.
 * @returns A prompt message object.
 */
function createPromptMessage(text: string): Message {
  return {
    createdAt: Date.now(),
    text,
    type: MESSAGE_TYPE.PROMPT,
  };
}

/**
 * Sets up the mock useChatState with the given messages.
 * @param messages - Array of messages.
 */
function setupMockState(messages: Message[]): void {
  mockUseChatState.mockReturnValue({
    state: { messages },
  });
}

describe("useKeyShortCuts", () => {
  beforeEach(() => {
    mockUseChatState.mockReset();
    setupMockState([]);
  });

  describe("enter key", () => {
    it("should prevent default and submit form on Enter", () => {
      const { result } = renderHook(() => useKeyShortCuts());
      const inputEl = createMockInputEl("some query");
      const event = createMockKeyEvent("Enter", inputEl);

      result.current.onKeyDown(event);

      expect(event.preventDefault).toHaveBeenCalled();
      expect(inputEl.form?.requestSubmit).toHaveBeenCalled();
    });

    it("should not prevent default on Shift+Enter", () => {
      const { result } = renderHook(() => useKeyShortCuts());
      const inputEl = createMockInputEl("some query");
      const event = createMockKeyEvent("Enter", inputEl, true);

      result.current.onKeyDown(event);

      expect(event.preventDefault).not.toHaveBeenCalled();
      expect(inputEl.form?.requestSubmit).not.toHaveBeenCalled();
    });
  });

  describe("escape key", () => {
    it("should clear input value on Escape", () => {
      const { result } = renderHook(() => useKeyShortCuts());
      const inputEl = createMockInputEl("some text");
      const event = createMockKeyEvent("Escape", inputEl);

      result.current.onKeyDown(event);

      expect(inputEl.value).toBe("");
    });
  });

  describe("arrow key history navigation", () => {
    it("should navigate to most recent history entry on ArrowUp", () => {
      setupMockState([
        createUserMessage("first query"),
        createPromptMessage("response"),
        createUserMessage("second query"),
      ]);
      const { result } = renderHook(() => useKeyShortCuts());
      const inputEl = createMockInputEl();
      const event = createMockKeyEvent("ArrowUp", inputEl);

      result.current.onKeyDown(event);

      expect(inputEl.value).toBe("second query");
    });

    it("should navigate through multiple history entries on ArrowUp", () => {
      setupMockState([
        createUserMessage("first query"),
        createUserMessage("second query"),
      ]);
      const { result } = renderHook(() => useKeyShortCuts());
      const inputEl = createMockInputEl();

      result.current.onKeyDown(createMockKeyEvent("ArrowUp", inputEl));
      expect(inputEl.value).toBe("second query");

      result.current.onKeyDown(createMockKeyEvent("ArrowUp", inputEl));
      expect(inputEl.value).toBe("first query");
    });

    it("should clamp at oldest history entry on ArrowUp", () => {
      setupMockState([createUserMessage("only query")]);
      const { result } = renderHook(() => useKeyShortCuts());
      const inputEl = createMockInputEl();

      result.current.onKeyDown(createMockKeyEvent("ArrowUp", inputEl));
      result.current.onKeyDown(createMockKeyEvent("ArrowUp", inputEl));

      expect(inputEl.value).toBe("only query");
    });

    it("should navigate forward on ArrowDown and restore draft at index -1", () => {
      setupMockState([
        createUserMessage("first query"),
        createUserMessage("second query"),
      ]);
      const { result } = renderHook(() => useKeyShortCuts());
      const inputEl = createMockInputEl("my draft");

      // Navigate up twice.
      result.current.onKeyDown(createMockKeyEvent("ArrowUp", inputEl));
      result.current.onKeyDown(createMockKeyEvent("ArrowUp", inputEl));
      expect(inputEl.value).toBe("first query");

      // Navigate down once.
      result.current.onKeyDown(createMockKeyEvent("ArrowDown", inputEl));
      expect(inputEl.value).toBe("second query");

      // Navigate down to restore draft.
      result.current.onKeyDown(createMockKeyEvent("ArrowDown", inputEl));
      expect(inputEl.value).toBe("my draft");
    });

    it("should not navigate on ArrowDown when not browsing history", () => {
      setupMockState([createUserMessage("some query")]);
      const { result } = renderHook(() => useKeyShortCuts());
      const inputEl = createMockInputEl("current text");
      const event = createMockKeyEvent("ArrowDown", inputEl);

      result.current.onKeyDown(event);

      expect(inputEl.value).toBe("current text");
    });

    it("should save draft before entering history", () => {
      setupMockState([createUserMessage("history entry")]);
      const { result } = renderHook(() => useKeyShortCuts());
      const inputEl = createMockInputEl("my draft text");

      // Navigate up to save draft and enter history.
      result.current.onKeyDown(createMockKeyEvent("ArrowUp", inputEl));
      expect(inputEl.value).toBe("history entry");

      // Navigate down to restore draft.
      result.current.onKeyDown(createMockKeyEvent("ArrowDown", inputEl));
      expect(inputEl.value).toBe("my draft text");
    });
  });

  describe("tab key", () => {
    it("should fill input with placeholder when input is empty", () => {
      const { result } = renderHook(() => useKeyShortCuts());
      const inputEl = createMockInputEl("", "Search for studies...");
      const event = createMockKeyEvent("Tab", inputEl);

      result.current.onKeyDown(event);

      expect(event.preventDefault).toHaveBeenCalled();
      expect(inputEl.value).toBe("Search for studies...");
    });

    it("should not prevent default when input has value", () => {
      const { result } = renderHook(() => useKeyShortCuts());
      const inputEl = createMockInputEl(
        "existing text",
        "Search for studies...",
      );
      const event = createMockKeyEvent("Tab", inputEl);

      result.current.onKeyDown(event);

      expect(event.preventDefault).not.toHaveBeenCalled();
      expect(inputEl.value).toBe("existing text");
    });
  });
});
