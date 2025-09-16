import { jest } from "@jest/globals";
import {
  createColumnHelper,
  getCoreRowModel,
  Row,
  Table,
  TableOptions,
  useReactTable,
} from "@tanstack/react-table";
import { renderHook, RenderHookResult } from "@testing-library/react";
import { ROW_SELECTION_VALIDATION } from "../src/components/Table/features/RowSelectionValidation/constants";
import { RowSelectionValidationOptions } from "../src/components/Table/features/RowSelectionValidation/types";
import { getSelectionValidation } from "../src/components/Table/features/RowSelectionValidation/utils";

type ValidationFn = NonNullable<
  RowSelectionValidationOptions<RowData>["getRowSelectionValidation"]
>;

interface RowData {
  id: number;
  isValid: boolean;
  name: string;
  status: "active" | "inactive";
}

const ACCESSOR_KEY: Record<string, keyof RowData> = {
  ID: "id",
  IS_VALID: "isValid",
  NAME: "name",
  STATUS: "status",
};

// Mock data.
const DATA: RowData[] = [
  { id: 1, isValid: true, name: "Item 1", status: "active" },
  { id: 2, isValid: false, name: "Item 2", status: "inactive" },
  { id: 3, isValid: true, name: "Item 3", status: "active" },
  { id: 4, isValid: false, name: "Item 4", status: "inactive" },
];

const columnHelper = createColumnHelper<RowData>();

// Mock column definitions.
const COLUMNS = [
  columnHelper.accessor(ACCESSOR_KEY.ID, { header: "ID" }),
  columnHelper.accessor(ACCESSOR_KEY.NAME, { header: "Name" }),
  columnHelper.accessor(ACCESSOR_KEY.IS_VALID, { header: "Valid" }),
  columnHelper.accessor(ACCESSOR_KEY.STATUS, { header: "Status" }),
];

// Test constants.
const VALIDATION_MESSAGE = {
  INVALID: "This item is invalid",
  VALID: "This item is valid",
};

const createTable = (
  tableOptions?: Omit<
    TableOptions<RowData>,
    "columns" | "data" | "getCoreRowModel"
  >
): RenderHookResult<Table<RowData>, unknown> => {
  return renderHook(() =>
    useReactTable({
      _features: [ROW_SELECTION_VALIDATION],
      columns: COLUMNS,
      data: DATA,
      enableRowSelectionValidation: true,
      getCoreRowModel: getCoreRowModel(),
      ...tableOptions,
    })
  );
};

describe("RowSelectionValidation Feature", () => {
  let tableWithoutValidation: any;
  let firstRowWithoutValidation: any;
  let tableWithValidation: any;
  let firstRowWithValidation: any;

  beforeEach(() => {
    const resultWithoutValidation = createTable();
    const resultWithValidation = createTable({
      getRowSelectionValidation: () => VALIDATION_MESSAGE.INVALID,
    });
    tableWithoutValidation = resultWithoutValidation.result.current;
    firstRowWithoutValidation = tableWithoutValidation.getRowModel().rows[0];
    tableWithValidation = resultWithValidation.result.current;
    firstRowWithValidation = tableWithValidation.getRowModel().rows[0];
  });

  describe("ROW_SELECTION_VALIDATION TableFeature", () => {
    test("should have correct structure", () => {
      expect(ROW_SELECTION_VALIDATION).toHaveProperty("createRow");
      expect(ROW_SELECTION_VALIDATION).toHaveProperty("getDefaultOptions");
      expect(typeof ROW_SELECTION_VALIDATION.createRow).toBe("function");
      expect(typeof ROW_SELECTION_VALIDATION.getDefaultOptions).toBe(
        "function"
      );
    });

    test("getDefaultOptions should return correct default options", () => {
      const { getDefaultOptions } = ROW_SELECTION_VALIDATION;
      expect(getDefaultOptions!(tableWithoutValidation)).toEqual({
        enableRowSelectionValidation: false,
        getRowSelectionValidation: undefined,
      });
    });
  });

  describe("getSelectionValidation utility", () => {
    test("should return undefined when no validation function is provided", () => {
      expect(
        getSelectionValidation(
          firstRowWithoutValidation,
          tableWithoutValidation
        )
      ).toBeUndefined();
    });

    test("should return validation message when validation function is provided", () => {
      expect(
        getSelectionValidation(firstRowWithValidation, tableWithValidation)
      ).toBe(VALIDATION_MESSAGE.INVALID);
    });

    test("should return undefined when validation function returns undefined", () => {
      const getRowSelectionValidation = jest
        .fn<ValidationFn>()
        .mockReturnValue(undefined);

      const { result } = createTable({ getRowSelectionValidation });

      const table = result.current;
      const firstRow = table.getRowModel().rows[0];

      const validationResult = getSelectionValidation(firstRow, table);

      expect(validationResult).toBeUndefined();
      expect(getRowSelectionValidation).toHaveBeenCalledWith(firstRow);
    });

    test("should work with different rows from the same table", () => {
      const getRowSelectionValidation = jest
        .fn<ValidationFn>()
        .mockImplementation((row) => {
          const status = row.getValue(ACCESSOR_KEY.STATUS);
          return status === "inactive" ? VALIDATION_MESSAGE.INVALID : undefined;
        });

      const { result } = createTable({ getRowSelectionValidation });

      const table = result.current;
      const rows = table.getRowModel().rows;

      expect(getSelectionValidation(rows[0], table)).toBeUndefined();
      expect(getSelectionValidation(rows[2], table)).toBeUndefined();
      expect(getSelectionValidation(rows[1], table)).toBe(
        VALIDATION_MESSAGE.INVALID
      );
      expect(getRowSelectionValidation).toHaveBeenCalledTimes(3);
    });
  });

  describe("row.getSelectionValidation method", () => {
    test("should be attached to rows when feature is included", () => {
      const rows = tableWithoutValidation.getRowModel().rows;

      rows.forEach((row: any) => {
        expect(row).toHaveProperty("getSelectionValidation");
        expect(typeof row.getSelectionValidation).toBe("function");
      });
    });

    test("should return undefined when no validation function is configured", () => {
      expect(
        firstRowWithoutValidation.getSelectionValidation()
      ).toBeUndefined();
    });

    test("should return validation message when validation function is configured", () => {
      expect(firstRowWithValidation.getSelectionValidation()).toBe(
        VALIDATION_MESSAGE.INVALID
      );
    });
  });

  describe("Integration with table options", () => {
    test("should work with getRowSelectionValidation function", () => {
      const enableRowSelection = jest
        .fn<(row: Row<RowData>) => boolean>()
        .mockImplementation((row) => row.getValue(ACCESSOR_KEY.IS_VALID));

      const getRowSelectionValidation = jest
        .fn<ValidationFn>()
        .mockImplementation((row) => {
          const isValid = row.getValue(ACCESSOR_KEY.IS_VALID);
          return isValid ? undefined : VALIDATION_MESSAGE.INVALID;
        });

      const { result } = createTable({
        enableRowSelection,
        getRowSelectionValidation,
      });

      const table = result.current;
      const rows = table.getRowModel().rows;

      rows.forEach((row) => {
        const isValid = row.getValue(ACCESSOR_KEY.IS_VALID);
        const canSelect = row.getCanSelect();
        const validationMessage = row.getSelectionValidation?.();

        if (isValid) {
          expect(canSelect).toBe(true);
          expect(validationMessage).toBeUndefined();
        } else {
          expect(canSelect).toBe(false);
          expect(validationMessage).toBe(VALIDATION_MESSAGE.INVALID);
        }
      });
    });

    test("should handle complex validation scenarios", () => {
      const getRowSelectionValidation = jest
        .fn<ValidationFn>()
        .mockImplementation((row) => {
          const id = row.getValue(ACCESSOR_KEY.ID);
          const isValid = row.getValue(ACCESSOR_KEY.IS_VALID);

          if (!isValid) return VALIDATION_MESSAGE.INVALID;
          if (id === 1) return VALIDATION_MESSAGE.VALID;
          return undefined;
        });

      const { result } = createTable({ getRowSelectionValidation });

      const table = result.current;
      const rows = table.getRowModel().rows;

      expect(rows[0].getSelectionValidation?.()).toBe(VALIDATION_MESSAGE.VALID);
      expect(rows[1].getSelectionValidation?.()).toBe(
        VALIDATION_MESSAGE.INVALID
      );
      expect(rows[2].getSelectionValidation?.()).toBeUndefined();
      expect(rows[3].getSelectionValidation?.()).toBe(
        VALIDATION_MESSAGE.INVALID
      );
    });
  });

  describe("Edge cases", () => {
    test("should work when feature is not included", () => {
      const { result } = createTable({
        _features: [],
        enableRowSelectionValidation: false,
      });

      const table = result.current;
      const firstRow = table.getRowModel().rows[0];

      expect(firstRow).not.toHaveProperty("getSelectionValidation");
    });

    test("should return undefined when feature is disabled", () => {
      const getRowSelectionValidation = jest
        .fn<ValidationFn>()
        .mockReturnValue(VALIDATION_MESSAGE.INVALID);

      const { result } = createTable({
        enableRowSelectionValidation: false,
        getRowSelectionValidation,
      });

      const table = result.current;
      const firstRow = table.getRowModel().rows[0];

      expect(firstRow.getSelectionValidation?.()).toBeUndefined();
      expect(getRowSelectionValidation).not.toHaveBeenCalled();
    });
  });
});
