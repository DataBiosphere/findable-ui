import { jest } from "@jest/globals";
import {
  createColumnHelper,
  getCoreRowModel,
  getSortedRowModel,
  TableOptions,
  useReactTable,
} from "@tanstack/react-table";
import { fireEvent, render, renderHook, screen } from "@testing-library/react";
import { JSX } from "react";
import { COLUMN_DEF } from "../src/components/Table/common/columnDef";
import { STICKY_HEAD_COLUMNS } from "../src/components/Table/common/constants";
import { ROW_DIRECTION } from "../src/components/Table/common/entities";
import {
  STICKY_HEAD_CONTEXT_VALUE,
  TableHeadContext,
} from "../src/components/Table/components/TableHead/context";
import { TableHead } from "../src/components/Table/components/TableHead/tableHead";
import { VirtualizedRow } from "../src/components/Table/components/TableRows/components/VirtualizedRow/virtualizedRow";
import { observeColumnTracks } from "../src/components/Table/hooks/UseStickyHeadColumns/utils";
import { useVirtualization } from "../src/components/Table/hooks/UseVirtualization/hook";
import type { TableVirtualizer } from "../src/components/Table/hooks/UseVirtualization/types";
import {
  getScrollMargin,
  observeScrollMargin,
  supportsPageScroll,
} from "../src/components/Table/hooks/UseVirtualization/utils";
import { SUPPORTS_SCROLL_DRIVEN_ANIMATIONS } from "../src/styles/common/constants/supports";

interface Row {
  name: string;
}

const columnHelper = createColumnHelper<Row>();
const COLUMNS = [columnHelper.accessor("name", { header: "Name" })];

/**
 * Renders a sortable, selectable table's head, as the pinned copy or the table's own.
 * @param props - Component props.
 * @param props.copy - Whether to render it as the pinned copy of the head.
 * @returns The table head, in a table, with the selection count.
 */
function InteractiveHead({ copy = false }: { copy?: boolean }): JSX.Element {
  const table = useReactTable<Row>({
    columns: [COLUMN_DEF.ROW_SELECTION as (typeof COLUMNS)[number], ...COLUMNS],
    data: [{ name: "a" }, { name: "b" }],
    enableRowSelection: true,
    enableSortingInteraction: true,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  } as TableOptions<Row>);
  const head = <TableHead tableInstance={table} />;
  return (
    <>
      <table>
        {copy ? (
          <TableHeadContext.Provider value={STICKY_HEAD_CONTEXT_VALUE}>
            {head}
          </TableHeadContext.Provider>
        ) : (
          head
        )}
      </table>
      <output data-testid="selected">
        {Object.keys(table.getState().rowSelection).length}
      </output>
      <output data-testid="sorting">
        {JSON.stringify(table.getState().sorting)}
      </output>
    </>
  );
}

/**
 * Builds a virtualizer stub with the given items, total size and page offset.
 * @param items - Start and end offsets of the rendered rows, including the page offset.
 * @param totalSize - Total size of all rows, excluding the page offset.
 * @param scrollMargin - Table body's offset from the top of the page.
 * @returns The virtualizer stub.
 */
function stubVirtualizer(
  items: { end: number; start: number }[],
  totalSize: number,
  scrollMargin: number,
): TableVirtualizer {
  return {
    getTotalSize: () => totalSize,
    getVirtualItems: () => items,
    options: { scrollMargin },
  } as unknown as TableVirtualizer;
}

/**
 * Renders the upper or lower spacer row and returns its height.
 * @param isUpperRow - Whether to render the spacer above the rows.
 * @param virtualizer - Virtualizer stub.
 * @returns The spacer cell's height, or undefined when no spacer renders.
 */
function spacerHeight(
  isUpperRow: boolean,
  virtualizer: TableVirtualizer,
): string | undefined {
  const { container } = render(
    <table>
      <tbody>
        <VirtualizedRow isUpperRow={isUpperRow} virtualizer={virtualizer} />
      </tbody>
    </table>,
  );
  return container.querySelector("td")?.style.height;
}

/**
 * Mocks the browser's CSS.supports.
 * @param supports - Result, or a mock to inspect calls.
 * @returns The mock.
 */
function mockCssSupports(
  supports: boolean | jest.Mock<(condition: string) => boolean>,
): jest.Mock<(condition: string) => boolean> {
  const mock =
    typeof supports === "boolean" ? jest.fn(() => supports) : supports;
  Object.defineProperty(globalThis, "CSS", {
    configurable: true,
    value: { supports: mock },
  });
  return mock;
}

/**
 * Builds a table container with its pinned head copy just before it, as the Table renders them.
 * @param tableHtml - The table's markup.
 * @returns The head copy and the container.
 */
function renderTableScroll(tableHtml = "<table></table>"): {
  container: HTMLDivElement;
  stickyHead: HTMLDivElement;
} {
  const wrapper = document.createElement("div");
  const stickyHead = document.createElement("div");
  const container = document.createElement("div");
  container.innerHTML = tableHtml;
  wrapper.append(stickyHead, container);
  return { container, stickyHead };
}

describe("Scrolling index table", () => {
  afterEach(() => {
    jest.restoreAllMocks();
    // Property overrides aren't mocks; undo them so they don't leak between tests.
    Reflect.deleteProperty(globalThis, "CSS");
    Reflect.deleteProperty(window, "scrollY");
  });

  describe("VirtualizedRow", () => {
    it("discounts the table's offset from the top of the page from the spacer rows", () => {
      // Rows 2–3 of 5 (each 100px) are rendered; the table body starts 500px down the page.
      const virtualizer = stubVirtualizer(
        [
          { end: 700, start: 600 },
          { end: 800, start: 700 },
        ],
        500,
        500,
      );
      expect(spacerHeight(true, virtualizer)).toBe("100px");
      expect(spacerHeight(false, virtualizer)).toBe("200px");
    });

    it("renders no spacer above the first row", () => {
      const virtualizer = stubVirtualizer([{ end: 600, start: 500 }], 100, 500);
      expect(spacerHeight(true, virtualizer)).toBeUndefined();
    });
  });

  describe("useVirtualization", () => {
    /**
     * Renders the hook with a one-row table and returns the virtualizer's scroll element.
     * @param pageScroll - Whether the page scrolls rather than the table.
     * @returns The element the virtualizer scrolls against.
     */
    function scrollElement(pageScroll?: boolean): unknown {
      const { result } = renderHook(() => {
        const table = useReactTable<Row>({
          columns: COLUMNS,
          data: [{ name: "a" }],
          getCoreRowModel: getCoreRowModel(),
        });
        return useVirtualization({
          pageScroll,
          rowDirection: ROW_DIRECTION.DEFAULT,
          table,
        });
      });
      return result.current.virtualizer.options.getScrollElement();
    }

    it("virtualizes against the table's own scroll container by default, as consumers' tables expect", () => {
      mockCssSupports(true);
      expect(scrollElement()).not.toBe(window);
    });

    it("virtualizes against the page with page scroll, where supported", () => {
      mockCssSupports(true);
      expect(scrollElement(true)).toBe(window);
    });

    it('observes the table\'s offset again when rows come back, e.g. after "No Results"', () => {
      mockCssSupports(true);
      const observe = jest.fn();
      jest.spyOn(globalThis, "ResizeObserver").mockImplementation(
        () =>
          ({
            disconnect: jest.fn(),
            observe,
            unobserve: jest.fn(),
          }) as unknown as ResizeObserver,
      );
      const container = document.createElement("div");
      const { rerender } = renderHook(
        ({ data }: { data: Row[] }) => {
          const table = useReactTable<Row>({
            columns: COLUMNS,
            data,
            getCoreRowModel: getCoreRowModel(),
          });
          const result = useVirtualization({
            pageScroll: true,
            rowDirection: ROW_DIRECTION.DEFAULT,
            table,
          });
          // The Table renders its container only while there are rows.
          result.scrollElementRef.current = data.length > 0 ? container : null;
          return result;
        },
        { initialProps: { data: [] as Row[] } },
      );
      expect(observe).not.toHaveBeenCalled();
      rerender({ data: [{ name: "a" }] });
      expect(observe).toHaveBeenCalledTimes(1);
    });

    it("falls back to the table's scroll container where page scroll isn't supported", () => {
      mockCssSupports(false);
      expect(scrollElement(true)).not.toBe(window);
    });
  });

  describe("useVirtualization utils", () => {
    it("measures the table body's offset from the top of the page", () => {
      const container = document.createElement("div");
      const tbody = document.createElement("tbody");
      container.appendChild(tbody);
      jest
        .spyOn(tbody, "getBoundingClientRect")
        .mockReturnValue({ top: 120 } as DOMRect);
      Object.defineProperty(window, "scrollY", {
        configurable: true,
        value: 400,
      });
      expect(getScrollMargin(container)).toBe(520);
    });

    it("observes nothing without a container", () => {
      expect(observeScrollMargin(null, jest.fn())).toBeUndefined();
    });

    it("supports the page scroll layout only where the browser supports the feature query", () => {
      const supports = mockCssSupports(false);
      expect(supportsPageScroll()).toBe(false);
      supports.mockReturnValue(true);
      expect(supportsPageScroll()).toBe(true);
      expect(supports).toHaveBeenCalledWith(SUPPORTS_SCROLL_DRIVEN_ANIMATIONS);
    });
  });

  describe("useStickyHeadColumns utils", () => {
    it("gives the pinned head copy the table's computed column widths, and removes them on cleanup", () => {
      const { container, stickyHead } = renderTableScroll();
      jest.spyOn(window, "getComputedStyle").mockReturnValue({
        gridTemplateColumns: "200.8px 340px",
      } as CSSStyleDeclaration);
      const cleanup = observeColumnTracks(container);
      expect(stickyHead.style.getPropertyValue(STICKY_HEAD_COLUMNS)).toBe(
        "200.8px 340px",
      );
      cleanup?.();
      expect(stickyHead.style.getPropertyValue(STICKY_HEAD_COLUMNS)).toBe("");
    });

    it("observes the table and each of its head cells, so a column changing width alone is caught", () => {
      const observe = jest.fn();
      jest.spyOn(globalThis, "ResizeObserver").mockImplementation(
        () =>
          ({
            disconnect: jest.fn(),
            observe,
            unobserve: jest.fn(),
          }) as unknown as ResizeObserver,
      );
      const { container } = renderTableScroll(
        '<table><thead class="MuiTableHead-root"><tr><th></th><th></th></tr></thead></table>',
      );
      observeColumnTracks(container);
      const table = container.querySelector("table");
      const cells = [...container.querySelectorAll("th")];
      expect(observe.mock.calls.map(([target]) => target)).toEqual([
        table,
        ...cells,
      ]);
    });

    it("observes nothing without a table", () => {
      expect(
        observeColumnTracks(document.createElement("div")),
      ).toBeUndefined();
    });
  });

  describe("TableHead", () => {
    it("keeps the head's controls in the tab order by default", () => {
      render(<InteractiveHead />);
      expect(
        screen.getByRole("button", { name: /Name/ }).getAttribute("tabindex"),
      ).toBe("0");
      expect(screen.getByRole("checkbox").getAttribute("tabindex")).toBeNull();
    });

    it("takes the pinned copy's controls out of the tab order, and keeps them clickable", () => {
      render(<InteractiveHead copy />);
      const sort = screen.getByRole("button", { name: /Name/ });
      const selectAll = screen.getByRole("checkbox");
      expect(sort.getAttribute("tabindex")).toBe("-1");
      expect(selectAll.getAttribute("tabindex")).toBe("-1");
      fireEvent.click(selectAll);
      expect(screen.getByTestId("selected").textContent).toBe("2");
      fireEvent.click(sort);
      expect(screen.getByTestId("sorting").textContent).toContain('"name"');
    });
  });
});
