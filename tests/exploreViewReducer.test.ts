import { clearPresetAction } from "../src/views/ExploreView/state/actions/clearPreset/action";
import { setPresetAction } from "../src/views/ExploreView/state/actions/setPreset/action";
import { ExploreViewActionKind } from "../src/views/ExploreView/state/actions/types";
import { exploreViewReducer } from "../src/views/ExploreView/state/reducer";
import { ExploreViewState } from "../src/views/ExploreView/state/types";

describe("exploreViewReducer", () => {
  describe("SetPreset action", () => {
    it("should set presetKey for a new entity", () => {
      const state: ExploreViewState = {};
      const action = {
        payload: { entityId: "projects", presetKey: "preset-1" },
        type: ExploreViewActionKind.SetPreset as const,
      };

      const result = exploreViewReducer(state, action);

      expect(result).toEqual({
        projects: { presetKey: "preset-1" },
      });
    });

    it("should update presetKey for an existing entity", () => {
      const state: ExploreViewState = {
        projects: { presetKey: "preset-1" },
      };
      const action = {
        payload: { entityId: "projects", presetKey: "preset-2" },
        type: ExploreViewActionKind.SetPreset as const,
      };

      const result = exploreViewReducer(state, action);

      expect(result).toEqual({
        projects: { presetKey: "preset-2" },
      });
    });

    it("should not affect other entities", () => {
      const state: ExploreViewState = {
        projects: { presetKey: "preset-1" },
        samples: { presetKey: "sample-preset" },
      };
      const action = {
        payload: { entityId: "projects", presetKey: "preset-2" },
        type: ExploreViewActionKind.SetPreset as const,
      };

      const result = exploreViewReducer(state, action);

      expect(result).toEqual({
        projects: { presetKey: "preset-2" },
        samples: { presetKey: "sample-preset" },
      });
    });
  });

  describe("ClearPreset action", () => {
    it("should clear presetKey for an entity", () => {
      const state: ExploreViewState = {
        projects: { presetKey: "preset-1" },
      };
      const action = {
        payload: { entityId: "projects" },
        type: ExploreViewActionKind.ClearPreset as const,
      };

      const result = exploreViewReducer(state, action);

      expect(result).toEqual({
        projects: { presetKey: null },
      });
    });

    it("should handle clearing a non-existent entity", () => {
      const state: ExploreViewState = {};
      const action = {
        payload: { entityId: "projects" },
        type: ExploreViewActionKind.ClearPreset as const,
      };

      const result = exploreViewReducer(state, action);

      expect(result).toEqual({
        projects: { presetKey: null },
      });
    });

    it("should not affect other entities", () => {
      const state: ExploreViewState = {
        projects: { presetKey: "preset-1" },
        samples: { presetKey: "sample-preset" },
      };
      const action = {
        payload: { entityId: "projects" },
        type: ExploreViewActionKind.ClearPreset as const,
      };

      const result = exploreViewReducer(state, action);

      expect(result).toEqual({
        projects: { presetKey: null },
        samples: { presetKey: "sample-preset" },
      });
    });
  });
});

describe("setPresetAction", () => {
  it("should return new state with preset set", () => {
    const state: ExploreViewState = {};
    const payload = { entityId: "files", presetKey: "my-preset" };

    const result = setPresetAction(state, payload);

    expect(result).toEqual({
      files: { presetKey: "my-preset" },
    });
    expect(result).not.toBe(state);
  });

  it("should preserve existing entity state properties", () => {
    const state: ExploreViewState = {
      files: { presetKey: "old-preset" },
    };
    const payload = { entityId: "files", presetKey: "new-preset" };

    const result = setPresetAction(state, payload);

    expect(result.files.presetKey).toBe("new-preset");
  });
});

describe("clearPresetAction", () => {
  it("should return new state with preset cleared", () => {
    const state: ExploreViewState = {
      files: { presetKey: "my-preset" },
    };
    const payload = { entityId: "files" };

    const result = clearPresetAction(state, payload);

    expect(result).toEqual({
      files: { presetKey: null },
    });
    expect(result).not.toBe(state);
  });

  it("should initialize entity state if not present", () => {
    const state: ExploreViewState = {};
    const payload = { entityId: "files" };

    const result = clearPresetAction(state, payload);

    expect(result).toEqual({
      files: { presetKey: null },
    });
  });
});
