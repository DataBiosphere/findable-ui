import { chatReducer } from "../src/views/ExploreView/research/state/reducer";
import { setErrorAction } from "../src/views/ExploreView/research/state/actions/setError/action";
import { setError } from "../src/views/ExploreView/research/state/actions/setError/dispatch";
import { setMessageAction } from "../src/views/ExploreView/research/state/actions/setMessage/action";
import { setMessage } from "../src/views/ExploreView/research/state/actions/setMessage/dispatch";
import { setQueryAction } from "../src/views/ExploreView/research/state/actions/setQuery/action";
import { setQuery } from "../src/views/ExploreView/research/state/actions/setQuery/dispatch";
import { setStatusAction } from "../src/views/ExploreView/research/state/actions/setStatus/action";
import { setStatus } from "../src/views/ExploreView/research/state/actions/setStatus/dispatch";
import { ChatActionKind } from "../src/views/ExploreView/research/state/actions/types";
import { INITIAL_STATE } from "../src/views/ExploreView/research/state/constants";
import { initializer } from "../src/views/ExploreView/research/state/initializer/initializer";
import {
  ChatState,
  MESSAGE_TYPE,
  MessageResponse,
  SUGGESTION_VARIANT,
} from "../src/views/ExploreView/research/state/types";

/**
 * Creates a mock MessageResponse for testing.
 * @param message - Optional message override.
 * @returns A mock MessageResponse object.
 */
const mockResponse = (message: string | null = null): MessageResponse => ({
  intent: "auto",
  message,
  query: {
    mentions: [],
    message: null,
  },
  timing: {
    lookupMs: 0,
    pipelineMs: 0,
    totalMs: 0,
  },
});

describe("setError action creator", () => {
  it("should return correct action shape", () => {
    const action = setError({ error: "Something went wrong" });

    expect(action).toEqual({
      payload: { error: "Something went wrong" },
      type: ChatActionKind.SetError,
    });
  });
});

describe("setErrorAction", () => {
  it("should append error to empty array", () => {
    const state: ChatState = { messages: [], status: { loading: false } };
    const result = setErrorAction(state, { error: "Network error" });

    expect(result.messages).toEqual([
      { error: "Network error", type: MESSAGE_TYPE.ERROR },
    ]);
  });

  it("should append error to existing messages", () => {
    const response = mockResponse("Response");
    const state: ChatState = {
      messages: [
        { text: "Query", type: MESSAGE_TYPE.USER },
        { response, type: MESSAGE_TYPE.ASSISTANT },
      ],
      status: { loading: false },
    };
    const result = setErrorAction(state, { error: "Request failed" });

    expect(result.messages).toEqual([
      { text: "Query", type: MESSAGE_TYPE.USER },
      { response, type: MESSAGE_TYPE.ASSISTANT },
      { error: "Request failed", type: MESSAGE_TYPE.ERROR },
    ]);
  });

  it("should not mutate original state", () => {
    const state: ChatState = {
      messages: [{ text: "Original", type: MESSAGE_TYPE.USER }],
      status: { loading: false },
    };
    const result = setErrorAction(state, { error: "Error" });

    expect(state.messages).toEqual([
      { text: "Original", type: MESSAGE_TYPE.USER },
    ]);
    expect(result).not.toBe(state);
    expect(result.messages).not.toBe(state.messages);
  });
});

describe("setMessage action creator", () => {
  it("should return correct action shape", () => {
    const response = mockResponse("Hello");
    const action = setMessage({ response });

    expect(action).toEqual({
      payload: { response },
      type: ChatActionKind.SetMessage,
    });
  });
});

describe("setMessageAction", () => {
  it("should append message to empty array", () => {
    const state: ChatState = { messages: [], status: { loading: false } };
    const response = mockResponse("First response");
    const result = setMessageAction(state, { response });

    expect(result.messages).toEqual([
      { response, type: MESSAGE_TYPE.ASSISTANT },
    ]);
  });

  it("should append message to existing messages", () => {
    const existingResponse = mockResponse("Second");
    const state: ChatState = {
      messages: [
        { text: "First", type: MESSAGE_TYPE.USER },
        { response: existingResponse, type: MESSAGE_TYPE.ASSISTANT },
      ],
      status: { loading: false },
    };
    const newResponse = mockResponse("Third");
    const result = setMessageAction(state, { response: newResponse });

    expect(result.messages).toEqual([
      { text: "First", type: MESSAGE_TYPE.USER },
      { response: existingResponse, type: MESSAGE_TYPE.ASSISTANT },
      { response: newResponse, type: MESSAGE_TYPE.ASSISTANT },
    ]);
  });

  it("should not mutate original state", () => {
    const state: ChatState = {
      messages: [{ text: "Original", type: MESSAGE_TYPE.USER }],
      status: { loading: false },
    };
    const response = mockResponse("New");
    const result = setMessageAction(state, { response });

    expect(state.messages).toEqual([
      { text: "Original", type: MESSAGE_TYPE.USER },
    ]);
    expect(result).not.toBe(state);
    expect(result.messages).not.toBe(state.messages);
  });
});

describe("setQuery action creator", () => {
  it("should return correct action shape", () => {
    const action = setQuery({ query: "What studies are available?" });

    expect(action).toEqual({
      payload: { query: "What studies are available?" },
      type: ChatActionKind.SetQuery,
    });
  });
});

describe("setQueryAction", () => {
  it("should append query to empty array", () => {
    const state: ChatState = { messages: [], status: { loading: false } };
    const result = setQueryAction(state, { query: "First query" });

    expect(result.messages).toEqual([
      { text: "First query", type: MESSAGE_TYPE.USER },
    ]);
  });

  it("should append query to existing messages", () => {
    const existingResponse = mockResponse("Response");
    const state: ChatState = {
      messages: [
        { text: "First", type: MESSAGE_TYPE.USER },
        { response: existingResponse, type: MESSAGE_TYPE.ASSISTANT },
      ],
      status: { loading: false },
    };
    const result = setQueryAction(state, { query: "Second query" });

    expect(result.messages).toEqual([
      { text: "First", type: MESSAGE_TYPE.USER },
      { response: existingResponse, type: MESSAGE_TYPE.ASSISTANT },
      { text: "Second query", type: MESSAGE_TYPE.USER },
    ]);
  });

  it("should not mutate original state", () => {
    const response = mockResponse("Original response");
    const state: ChatState = {
      messages: [{ response, type: MESSAGE_TYPE.ASSISTANT }],
      status: { loading: false },
    };
    const result = setQueryAction(state, { query: "New query" });

    expect(state.messages).toEqual([
      { response, type: MESSAGE_TYPE.ASSISTANT },
    ]);
    expect(result).not.toBe(state);
    expect(result.messages).not.toBe(state.messages);
  });
});

describe("setStatus action creator", () => {
  it("should return correct action shape", () => {
    const action = setStatus({ loading: true });

    expect(action).toEqual({
      payload: { loading: true },
      type: ChatActionKind.SetStatus,
    });
  });
});

describe("setStatusAction", () => {
  it("should set loading to true", () => {
    const state: ChatState = { messages: [], status: { loading: false } };
    const result = setStatusAction(state, { loading: true });

    expect(result.status.loading).toBe(true);
  });

  it("should set loading to false", () => {
    const state: ChatState = { messages: [], status: { loading: true } };
    const result = setStatusAction(state, { loading: false });

    expect(result.status.loading).toBe(false);
  });

  it("should preserve messages when setting loading", () => {
    const response = mockResponse("Test");
    const state: ChatState = {
      messages: [
        { text: "Query", type: MESSAGE_TYPE.USER },
        { response, type: MESSAGE_TYPE.ASSISTANT },
      ],
      status: { loading: false },
    };
    const result = setStatusAction(state, { loading: true });

    expect(result.messages).toEqual(state.messages);
  });

  it("should not mutate original state", () => {
    const state: ChatState = { messages: [], status: { loading: false } };
    const result = setStatusAction(state, { loading: true });

    expect(state.status.loading).toBe(false);
    expect(result).not.toBe(state);
  });
});

describe("chatReducer", () => {
  it("should return initial state for unknown action", () => {
    const state: ChatState = { messages: [], status: { loading: false } };
    const unknownAction = { payload: {}, type: "UNKNOWN" } as never;

    const result = chatReducer(state, unknownAction);

    expect(result).toBe(state);
  });

  it("should handle SetMessage action", () => {
    const state: ChatState = { messages: [], status: { loading: false } };
    const response = mockResponse("Test response");
    const action = setMessage({ response });

    const result = chatReducer(state, action);

    expect(result.messages).toEqual([
      { response, type: MESSAGE_TYPE.ASSISTANT },
    ]);
  });

  it("should handle SetQuery action", () => {
    const state: ChatState = { messages: [], status: { loading: false } };
    const action = setQuery({ query: "Test query" });

    const result = chatReducer(state, action);

    expect(result.messages).toEqual([
      { text: "Test query", type: MESSAGE_TYPE.USER },
    ]);
  });

  it("should return new state reference on SetMessage", () => {
    const state: ChatState = { messages: [], status: { loading: false } };
    const response = mockResponse("Test");
    const action = setMessage({ response });

    const result = chatReducer(state, action);

    expect(result).not.toBe(state);
  });

  it("should return new state reference on SetQuery", () => {
    const state: ChatState = { messages: [], status: { loading: false } };
    const action = setQuery({ query: "Test" });

    const result = chatReducer(state, action);

    expect(result).not.toBe(state);
  });

  it("should handle SetStatus action", () => {
    const state: ChatState = { messages: [], status: { loading: false } };
    const action = setStatus({ loading: true });

    const result = chatReducer(state, action);

    expect(result.status.loading).toBe(true);
  });

  it("should return new state reference on SetStatus", () => {
    const state: ChatState = { messages: [], status: { loading: false } };
    const action = setStatus({ loading: true });

    const result = chatReducer(state, action);

    expect(result).not.toBe(state);
  });

  it("should handle SetError action", () => {
    const state: ChatState = { messages: [], status: { loading: false } };
    const action = setError({ error: "Test error" });

    const result = chatReducer(state, action);

    expect(result.messages).toEqual([
      { error: "Test error", type: MESSAGE_TYPE.ERROR },
    ]);
  });

  it("should return new state reference on SetError", () => {
    const state: ChatState = { messages: [], status: { loading: false } };
    const action = setError({ error: "Test error" });

    const result = chatReducer(state, action);

    expect(result).not.toBe(state);
  });
});

describe("initializer", () => {
  it("should return initial state when no args provided", () => {
    const result = initializer();

    expect(result).toBe(INITIAL_STATE);
  });

  it("should return initial state when undefined is passed", () => {
    const result = initializer(undefined);

    expect(result).toBe(INITIAL_STATE);
  });

  it("should inject a prompt message when initialArgs is provided", () => {
    const result = initializer({ text: "Welcome to the assistant" });

    expect(result.messages).toEqual([
      { text: "Welcome to the assistant", type: MESSAGE_TYPE.PROMPT },
    ]);
  });

  it("should include all initialArgs properties in the prompt message", () => {
    const result = initializer({
      inputPlaceholder: "Ask about datasets",
      suggestions: [
        {
          label: "GLP-1",
          query: "GLP-1 studies",
          variant: SUGGESTION_VARIANT.CHIP,
        },
      ],
      text: "How can I help?",
    });

    expect(result.messages).toHaveLength(1);
    expect(result.messages[0]).toEqual({
      inputPlaceholder: "Ask about datasets",
      suggestions: [
        {
          label: "GLP-1",
          query: "GLP-1 studies",
          variant: SUGGESTION_VARIANT.CHIP,
        },
      ],
      text: "How can I help?",
      type: MESSAGE_TYPE.PROMPT,
    });
  });

  it("should preserve default status when initialArgs is provided", () => {
    const result = initializer({ text: "Welcome" });

    expect(result.status).toEqual({ loading: false });
  });
});
