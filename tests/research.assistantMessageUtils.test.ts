import {
  getMappings,
  getMentions,
} from "../src/views/ResearchView/assistant/components/Messages/components/AssistantMessage/utils";
import {
  AssistantMessage,
  MESSAGE_TYPE,
} from "../src/views/ResearchView/state/types";

/**
 * Creates a mock AssistantMessage with the given mentions.
 * @param mentions - Array of mention objects.
 * @returns A mock AssistantMessage.
 */
function mockMessage(
  mentions: AssistantMessage["response"]["query"]["mentions"],
): AssistantMessage {
  return {
    createdAt: Date.now(),
    response: {
      intent: "auto",
      message: null,
      query: {
        mentions,
        message: null,
      },
      timing: {
        lookupMs: 0,
        pipelineMs: 0,
        totalMs: 0,
      },
    },
    type: MESSAGE_TYPE.ASSISTANT,
  };
}

describe("getMappings", () => {
  it("returns empty string for empty mentions", () => {
    expect(getMappings(mockMessage([]))).toBe("");
  });

  it("formats a single mention", () => {
    const message = mockMessage([
      {
        exclude: false,
        facet: "disease",
        originalText: "T2D",
        values: ["T2D"],
      },
    ]);
    expect(getMappings(message)).toBe("disease: T2D");
  });

  it("formats a mention with multiple values", () => {
    const message = mockMessage([
      {
        exclude: false,
        facet: "disease",
        originalText: "cancer",
        values: ["lung cancer", "breast cancer"],
      },
    ]);
    expect(getMappings(message)).toBe("disease: lung cancer, breast cancer");
  });

  it("groups mentions by facet", () => {
    const message = mockMessage([
      {
        exclude: false,
        facet: "disease",
        originalText: "T2D",
        values: ["T2D"],
      },
      {
        exclude: false,
        facet: "disease",
        originalText: "T1D",
        values: ["T1D"],
      },
    ]);
    expect(getMappings(message)).toBe("disease: T2D, T1D");
  });

  it("separates different facets with slashes", () => {
    const message = mockMessage([
      {
        exclude: false,
        facet: "disease",
        originalText: "T2D",
        values: ["T2D"],
      },
      {
        exclude: false,
        facet: "data_type",
        originalText: "WGS",
        values: ["WGS"],
      },
    ]);
    expect(getMappings(message)).toBe("disease: T2D / data_type: WGS");
  });

  it("marks excluded facets", () => {
    const message = mockMessage([
      {
        exclude: true,
        facet: "disease",
        originalText: "T2D",
        values: ["T2D"],
      },
    ]);
    expect(getMappings(message)).toBe("disease (exclude): T2D");
  });
});

describe("getMentions", () => {
  it("returns empty string for empty mentions", () => {
    expect(getMentions(mockMessage([]))).toBe("");
  });

  it("returns original text for a single mention", () => {
    const message = mockMessage([
      {
        exclude: false,
        facet: "disease",
        originalText: "T2D",
        values: ["T2D"],
      },
    ]);
    expect(getMentions(message)).toBe("T2D");
  });

  it("joins multiple mentions with commas", () => {
    const message = mockMessage([
      {
        exclude: false,
        facet: "disease",
        originalText: "T2D",
        values: ["T2D"],
      },
      {
        exclude: false,
        facet: "data_type",
        originalText: "WGS",
        values: ["WGS"],
      },
    ]);
    expect(getMentions(message)).toBe("T2D, WGS");
  });
});
