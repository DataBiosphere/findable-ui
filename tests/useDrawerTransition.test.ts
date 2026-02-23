import { jest } from "@jest/globals";
import { act, renderHook } from "@testing-library/react";

jest.unstable_mockModule("../src/hooks/useBreakpoint", () => ({
  useBreakpoint: jest.fn(),
}));

jest.unstable_mockModule(
  "../src/components/common/Drawer/provider/hook",
  () => ({
    useDrawer: jest.fn(),
  }),
);

const { useBreakpoint } = await import("../src/hooks/useBreakpoint");
const { useDrawer } =
  await import("../src/components/common/Drawer/provider/hook");
const { useDrawerTransition } =
  await import("../src/views/ExploreView/components/Drawer/hooks/UseDrawerTransition/hook");

type UseBreakpointReturn = ReturnType<typeof useBreakpoint>;
type UseDrawerReturn = ReturnType<typeof useDrawer>;

const mockUseBreakpoint = useBreakpoint as jest.MockedFunction<
  () => UseBreakpointReturn
>;
const mockUseDrawer = useDrawer as jest.MockedFunction<() => UseDrawerReturn>;

interface MockDrawer extends UseDrawerReturn {
  onClose: jest.Mock;
  onOpen: jest.Mock;
}

interface TransitionCallbacks {
  onEnter: () => void;
  onEntered: () => void;
  onExit: () => void;
  onExited: () => void;
}

/**
 * Helper to get transition callbacks from hook result.
 * @param result - The hook result.
 * @returns The transition callbacks.
 */
function getTransition(
  result: ReturnType<typeof useDrawerTransition>,
): TransitionCallbacks {
  return result.slotProps?.transition as unknown as TransitionCallbacks;
}

describe("useDrawerTransition", () => {
  const createMockDrawer = (open = false): MockDrawer => ({
    onClose: jest.fn(),
    onOpen: jest.fn(),
    open,
  });

  const createMockBreakpoint = (mdDown: boolean): UseBreakpointReturn =>
    ({
      mdDown,
    }) as UseBreakpointReturn;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("initial state", () => {
    it("should return persistent variant when above breakpoint", () => {
      const mockDrawer = createMockDrawer(false);
      mockUseBreakpoint.mockReturnValue(createMockBreakpoint(false));
      mockUseDrawer.mockReturnValue(mockDrawer);

      const { result } = renderHook(() => useDrawerTransition());

      expect(result.current.variant).toBe("persistent");
    });

    it("should return temporary variant when below breakpoint", () => {
      const mockDrawer = createMockDrawer(false);
      mockUseBreakpoint.mockReturnValue(createMockBreakpoint(true));
      mockUseDrawer.mockReturnValue(mockDrawer);

      const { result } = renderHook(() => useDrawerTransition());

      expect(result.current.variant).toBe("temporary");
    });

    it("should open drawer on mount when above breakpoint", () => {
      const mockDrawer = createMockDrawer(false);
      mockUseBreakpoint.mockReturnValue(createMockBreakpoint(false));
      mockUseDrawer.mockReturnValue(mockDrawer);

      renderHook(() => useDrawerTransition());

      expect(mockDrawer.onOpen).toHaveBeenCalled();
    });

    it("should not open drawer on mount when below breakpoint", () => {
      const mockDrawer = createMockDrawer(false);
      mockUseBreakpoint.mockReturnValue(createMockBreakpoint(true));
      mockUseDrawer.mockReturnValue(mockDrawer);

      renderHook(() => useDrawerTransition());

      expect(mockDrawer.onOpen).not.toHaveBeenCalled();
    });
  });

  describe("persistent to temporary transition", () => {
    it("should close drawer when transitioning from PERSISTENT_OPEN to below breakpoint", () => {
      const mockDrawer = createMockDrawer(false);
      mockUseBreakpoint.mockReturnValue(createMockBreakpoint(false));
      mockUseDrawer.mockReturnValue(mockDrawer);

      const { rerender, result } = renderHook(() => useDrawerTransition());

      // Simulate onEntered to reach PERSISTENT_OPEN
      act(() => {
        getTransition(result.current).onEntered();
      });

      mockDrawer.onOpen.mockClear();

      // Change to below breakpoint
      mockUseBreakpoint.mockReturnValue(createMockBreakpoint(true));
      rerender();

      expect(mockDrawer.onClose).toHaveBeenCalled();
      // Variant should remain persistent during closing transition
      expect(result.current.variant).toBe("persistent");
    });

    it("should switch to temporary variant after onExited", () => {
      const mockDrawer = createMockDrawer(false);
      mockUseBreakpoint.mockReturnValue(createMockBreakpoint(false));
      mockUseDrawer.mockReturnValue(mockDrawer);

      const { rerender, result } = renderHook(() => useDrawerTransition());

      // Reach PERSISTENT_OPEN
      act(() => {
        getTransition(result.current).onEntered();
      });

      // Change to below breakpoint
      mockUseBreakpoint.mockReturnValue(createMockBreakpoint(true));
      rerender();

      // Simulate close transition complete
      act(() => {
        getTransition(result.current).onExited();
      });

      expect(result.current.variant).toBe("temporary");
    });
  });

  describe("temporary to persistent transition", () => {
    it("should open drawer when transitioning from TEMPORARY_CLOSED to above breakpoint", () => {
      const mockDrawer = createMockDrawer(false);
      mockUseBreakpoint.mockReturnValue(createMockBreakpoint(true));
      mockUseDrawer.mockReturnValue(mockDrawer);

      const { rerender } = renderHook(() => useDrawerTransition());

      // Change to above breakpoint
      mockUseBreakpoint.mockReturnValue(createMockBreakpoint(false));
      rerender();

      expect(mockDrawer.onOpen).toHaveBeenCalled();
    });

    it("should close drawer when transitioning from TEMPORARY_OPEN to above breakpoint", () => {
      const mockDrawer = createMockDrawer(false);
      mockUseBreakpoint.mockReturnValue(createMockBreakpoint(true));
      mockUseDrawer.mockReturnValue(mockDrawer);

      const { rerender, result } = renderHook(() => useDrawerTransition());

      // Simulate user opening drawer
      act(() => {
        getTransition(result.current).onEnter();
        getTransition(result.current).onEntered();
      });

      // Change to above breakpoint
      mockUseBreakpoint.mockReturnValue(createMockBreakpoint(false));
      rerender();

      expect(mockDrawer.onClose).toHaveBeenCalled();
      // Variant should remain temporary during closing transition
      expect(result.current.variant).toBe("temporary");
    });

    it("should switch to persistent variant and open drawer after onExited", () => {
      const mockDrawer = createMockDrawer(false);
      mockUseBreakpoint.mockReturnValue(createMockBreakpoint(true));
      mockUseDrawer.mockReturnValue(mockDrawer);

      const { rerender, result } = renderHook(() => useDrawerTransition());

      // Reach TEMPORARY_OPEN
      act(() => {
        getTransition(result.current).onEnter();
        getTransition(result.current).onEntered();
      });

      // Change to above breakpoint
      mockUseBreakpoint.mockReturnValue(createMockBreakpoint(false));
      rerender();

      mockDrawer.onOpen.mockClear();

      // Simulate close transition complete
      act(() => {
        getTransition(result.current).onExited();
      });

      expect(result.current.variant).toBe("persistent");
      expect(mockDrawer.onOpen).toHaveBeenCalled();
    });
  });

  describe("transition callbacks", () => {
    it("should return all transition callbacks in slotProps", () => {
      const mockDrawer = createMockDrawer(false);
      mockUseBreakpoint.mockReturnValue(createMockBreakpoint(false));
      mockUseDrawer.mockReturnValue(mockDrawer);

      const { result } = renderHook(() => useDrawerTransition());
      const transition = getTransition(result.current);

      expect(transition.onEnter).toBeInstanceOf(Function);
      expect(transition.onEntered).toBeInstanceOf(Function);
      expect(transition.onExit).toBeInstanceOf(Function);
      expect(transition.onExited).toBeInstanceOf(Function);
    });

    it("onEnter should transition TEMPORARY_CLOSED to TEMPORARY_OPENING", () => {
      const mockDrawer = createMockDrawer(false);
      mockUseBreakpoint.mockReturnValue(createMockBreakpoint(true));
      mockUseDrawer.mockReturnValue(mockDrawer);

      const { result } = renderHook(() => useDrawerTransition());

      // Initial state is TEMPORARY_CLOSED
      expect(result.current.variant).toBe("temporary");

      act(() => {
        getTransition(result.current).onEnter();
      });

      // Still temporary (TEMPORARY_OPENING)
      expect(result.current.variant).toBe("temporary");
    });

    it("onExit should transition TEMPORARY_OPEN to TEMPORARY_CLOSING", () => {
      const mockDrawer = createMockDrawer(false);
      mockUseBreakpoint.mockReturnValue(createMockBreakpoint(true));
      mockUseDrawer.mockReturnValue(mockDrawer);

      const { result } = renderHook(() => useDrawerTransition());

      // Reach TEMPORARY_OPEN
      act(() => {
        getTransition(result.current).onEnter();
        getTransition(result.current).onEntered();
      });

      act(() => {
        getTransition(result.current).onExit();
      });

      // Still temporary (TEMPORARY_CLOSING)
      expect(result.current.variant).toBe("temporary");
    });

    it("onExited should not change phase when not in closing state", () => {
      const mockDrawer = createMockDrawer(false);
      mockUseBreakpoint.mockReturnValue(createMockBreakpoint(false));
      mockUseDrawer.mockReturnValue(mockDrawer);

      const { result } = renderHook(() => useDrawerTransition());
      const initialVariant = result.current.variant;

      act(() => {
        getTransition(result.current).onExited();
      });

      expect(result.current.variant).toBe(initialVariant);
    });
  });
});
