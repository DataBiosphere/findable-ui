import { chatReducer } from "../src/views/ExploreView/research/state/reducer";
import { setMessageAction } from "../src/views/ExploreView/research/state/actions/setMessage/action";
import { setMessage } from "../src/views/ExploreView/research/state/actions/setMessage/dispatch";
import { ChatActionKind } from "../src/views/ExploreView/research/state/actions/types";
import { ChatState } from "../src/views/ExploreView/research/state/types";

describe("setMessage action creator", () => {
  it("should return correct action shape", () => {
    const action = setMessage({ message: "Hello" });

    expect(action).toEqual({
      payload: { message: "Hello" },
      type: ChatActionKind.SetMessage,
    });
  });
});

describe("setMessageAction", () => {
  it("should append message to empty array", () => {
    const state: ChatState = { loading: false, messages: [] };
    const result = setMessageAction(state, { message: "First message" });

    expect(result.messages).toEqual(["First message"]);
  });

  it("should append message to existing messages", () => {
    const state: ChatState = { loading: false, messages: ["First", "Second"] };
    const result = setMessageAction(state, { message: "Third" });

    expect(result.messages).toEqual(["First", "Second", "Third"]);
  });

  it("should not mutate original state", () => {
    const state: ChatState = { loading: false, messages: ["Original"] };
    const result = setMessageAction(state, { message: "New" });

    expect(state.messages).toEqual(["Original"]);
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
    const action = setMessage({ message: "Test message" });

    const result = chatReducer(state, action);

    expect(result.messages).toEqual(["Test message"]);
  });

  it("should return new state reference on SetMessage", () => {
    const state: ChatState = { loading: false, messages: [] };
    const action = setMessage({ message: "Test" });

    const result = chatReducer(state, action);

    expect(result).not.toBe(state);
  });
});
