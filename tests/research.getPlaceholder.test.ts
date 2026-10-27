import { getPlaceholder } from "../src/views/ResearchView/assistant/components/Input/utils";
import {
  type ChatState,
  type Message,
  MESSAGE_TYPE,
} from "../src/views/ResearchView/state/types";

describe("getPlaceholder", () => {
  it("returns the default with no messages", () => {
    expect(getPlaceholder(buildState([]))).toBe("Ask anything");
  });

  it("returns the default when no message sets a placeholder", () => {
    expect(
      getPlaceholder(
        buildState([prompt(), user(), assistant(), error(), assistant()]),
      ),
    ).toBe("Ask anything");
  });

  it.each([
    [
      "an assistant response after a prompt",
      [prompt("From prompt"), user(), assistant("From response")],
      "From response",
    ],
    [
      "a prompt after an assistant response",
      [assistant("From response"), prompt("From prompt")],
      "From prompt",
    ],
    [
      "the later of two assistant responses",
      [
        prompt("From prompt"),
        user(),
        assistant("First response"),
        user(),
        assistant("Second response"),
      ],
      "Second response",
    ],
  ])("uses %s", (_, messages, expected) => {
    expect(getPlaceholder(buildState(messages))).toBe(expected);
  });

  it.each([
    [
      "an assistant response without one",
      [prompt("From prompt"), user(), assistant()],
    ],
    [
      "a user or error message",
      [prompt("From prompt"), user(), error(), user()],
    ],
  ])("keeps the latest placeholder after %s", (_, messages) => {
    expect(getPlaceholder(buildState(messages))).toBe("From prompt");
  });
});

/**
 * Builds an assistant message, with an input placeholder on its response if given.
 * @param inputPlaceholder - Input placeholder.
 * @returns Assistant message.
 */
function assistant(inputPlaceholder?: string): Message {
  return {
    createdAt: 0,
    response: {
      inputPlaceholder,
      intent: "auto",
      message: null,
      query: { mentions: [], message: null },
      timing: { lookupMs: 0, pipelineMs: 0, totalMs: 0 },
    },
    type: MESSAGE_TYPE.ASSISTANT,
  };
}

/**
 * Builds a chat state with the given messages.
 * @param messages - Messages, oldest first.
 * @returns Chat state.
 */
function buildState(messages: Message[]): ChatState {
  return { messages, status: { loading: false } };
}

/**
 * Builds an error message.
 * @returns Error message.
 */
function error(): Message {
  return { createdAt: 0, error: "Error", type: MESSAGE_TYPE.ERROR };
}

/**
 * Builds a prompt message, with an input placeholder if given.
 * @param inputPlaceholder - Input placeholder.
 * @returns Prompt message.
 */
function prompt(inputPlaceholder?: string): Message {
  return {
    createdAt: 0,
    inputPlaceholder,
    text: "Prompt",
    type: MESSAGE_TYPE.PROMPT,
  };
}

/**
 * Builds a user message.
 * @returns User message.
 */
function user(): Message {
  return { createdAt: 0, text: "Query", type: MESSAGE_TYPE.USER };
}
