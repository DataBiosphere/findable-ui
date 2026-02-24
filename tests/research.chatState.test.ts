import { chatReducer } from "../src/views/ExploreView/research/state/reducer";
import { setResponseAction } from "../src/views/ExploreView/research/state/actions/setResponse/action";
import { setResponse } from "../src/views/ExploreView/research/state/actions/setResponse/dispatch";
import { ChatActionKind } from "../src/views/ExploreView/research/state/actions/types";
import { ChatState } from "../src/views/ExploreView/research/state/types";

describe("setResponse action creator", () => {
  it("should return correct action shape", () => {
    const action = setResponse({ response: "Hello" });

    expect(action).toEqual({
      payload: { response: "Hello" },
      type: ChatActionKind.SetResponse,
    });
  });
});

describe("setResponseAction", () => {
  it("should append response to empty array", () => {
    const state: ChatState = { responses: [] };
    const result = setResponseAction(state, { response: "First response" });

    expect(result.responses).toEqual(["First response"]);
  });

  it("should append response to existing responses", () => {
    const state: ChatState = { responses: ["First", "Second"] };
    const result = setResponseAction(state, { response: "Third" });

    expect(result.responses).toEqual(["First", "Second", "Third"]);
  });

  it("should not mutate original state", () => {
    const state: ChatState = { responses: ["Original"] };
    const result = setResponseAction(state, { response: "New" });

    expect(state.responses).toEqual(["Original"]);
    expect(result).not.toBe(state);
    expect(result.responses).not.toBe(state.responses);
  });
});

describe("chatReducer", () => {
  it("should return initial state for unknown action", () => {
    const state: ChatState = { responses: [] };
    const unknownAction = { payload: {}, type: "UNKNOWN" } as never;

    const result = chatReducer(state, unknownAction);

    expect(result).toBe(state);
  });

  it("should handle SetResponse action", () => {
    const state: ChatState = { responses: [] };
    const action = setResponse({ response: "Test response" });

    const result = chatReducer(state, action);

    expect(result.responses).toEqual(["Test response"]);
  });

  it("should return new state reference on SetResponse", () => {
    const state: ChatState = { responses: [] };
    const action = setResponse({ response: "Test" });

    const result = chatReducer(state, action);

    expect(result).not.toBe(state);
  });
});
