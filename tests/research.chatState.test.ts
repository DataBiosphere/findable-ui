import { chatReducer } from "../src/views/ExploreView/research/state/reducer";
import { setMessageAction } from "../src/views/ExploreView/research/state/actions/setMessage/action";
import { setMessage } from "../src/views/ExploreView/research/state/actions/setMessage/dispatch";
import { setQueryAction } from "../src/views/ExploreView/research/state/actions/setQuery/action";
import { setQuery } from "../src/views/ExploreView/research/state/actions/setQuery/dispatch";
import { ChatActionKind } from "../src/views/ExploreView/research/state/actions/types";
import {
  ChatState,
  MESSAGE_TYPE,
  MessageResponse,
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
    const state: ChatState = { loading: false, messages: [] };
    const response = mockResponse("First response");
    const result = setMessageAction(state, { response });

    expect(result.messages).toEqual([
      { response, type: MESSAGE_TYPE.ASSISTANT },
    ]);
  });

  it("should append message to existing messages", () => {
    const existingResponse = mockResponse("Second");
    const state: ChatState = {
      loading: false,
      messages: [
        { text: "First", type: MESSAGE_TYPE.USER },
        { response: existingResponse, type: MESSAGE_TYPE.ASSISTANT },
      ],
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
      loading: false,
      messages: [{ text: "Original", type: MESSAGE_TYPE.USER }],
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
    const state: ChatState = { loading: false, messages: [] };
    const result = setQueryAction(state, { query: "First query" });

    expect(result.messages).toEqual([
      { text: "First query", type: MESSAGE_TYPE.USER },
    ]);
  });

  it("should append query to existing messages", () => {
    const existingResponse = mockResponse("Response");
    const state: ChatState = {
      loading: false,
      messages: [
        { text: "First", type: MESSAGE_TYPE.USER },
        { response: existingResponse, type: MESSAGE_TYPE.ASSISTANT },
      ],
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
      loading: false,
      messages: [{ response, type: MESSAGE_TYPE.ASSISTANT }],
    };
    const result = setQueryAction(state, { query: "New query" });

    expect(state.messages).toEqual([
      { response, type: MESSAGE_TYPE.ASSISTANT },
    ]);
    expect(result).not.toBe(state);
    expect(result.messages).not.toBe(state.messages);
  });
});

describe("chatReducer", () => {
  it("should return initial state for unknown action", () => {
    const state: ChatState = { loading: false, messages: [] };
    const unknownAction = { payload: {}, type: "UNKNOWN" } as never;

    const result = chatReducer(state, unknownAction);

    expect(result).toBe(state);
  });

  it("should handle SetMessage action", () => {
    const state: ChatState = { loading: false, messages: [] };
    const response = mockResponse("Test response");
    const action = setMessage({ response });

    const result = chatReducer(state, action);

    expect(result.messages).toEqual([
      { response, type: MESSAGE_TYPE.ASSISTANT },
    ]);
  });

  it("should handle SetQuery action", () => {
    const state: ChatState = { loading: false, messages: [] };
    const action = setQuery({ query: "Test query" });

    const result = chatReducer(state, action);

    expect(result.messages).toEqual([
      { text: "Test query", type: MESSAGE_TYPE.USER },
    ]);
  });

  it("should return new state reference on SetMessage", () => {
    const state: ChatState = { loading: false, messages: [] };
    const response = mockResponse("Test");
    const action = setMessage({ response });

    const result = chatReducer(state, action);

    expect(result).not.toBe(state);
  });

  it("should return new state reference on SetQuery", () => {
    const state: ChatState = { loading: false, messages: [] };
    const action = setQuery({ query: "Test" });

    const result = chatReducer(state, action);

    expect(result).not.toBe(state);
  });
});
