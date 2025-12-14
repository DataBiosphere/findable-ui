import { jest } from "@jest/globals";
import { renderHook, waitFor } from "@testing-library/react";
import React from "react";
import {
  AlternateTermNamesMap,
  AlternateTermNamesProvider,
} from "../src/providers/alternateTermNames/alternateTermNames";
import { useAlternateTermNames } from "../src/providers/alternateTermNames/useAlternateTermNames";
import { getAlternateName } from "../src/providers/alternateTermNames/utils";

const ALTERNATE_TERM_NAMES_URL = "/fe-api/alternateTermNames.json";
const TEST_SPECIES = "Homo sapiens";

// Mock fetch globally
global.fetch = jest.fn() as jest.MockedFunction<typeof fetch>;

describe("AlternateTermNames", () => {
  beforeEach(() => {
    // Reset fetch mock before each test
    (global.fetch as jest.Mock).mockReset();
  });

  describe("getAlternateName", () => {
    it("returns alternate name when found in map", () => {
      const alternateTermNames: AlternateTermNamesMap = {
        species: {
          "Homo sapiens": "Human",
          "Mus musculus": "Mouse",
        },
      };

      const result = getAlternateName(
        alternateTermNames,
        "species",
        TEST_SPECIES
      );
      expect(result).toBe("Human");
    });

    it("returns undefined when facet not found", () => {
      const alternateTermNames: AlternateTermNamesMap = {
        species: {
          "Homo sapiens": "Human",
        },
      };

      const result = getAlternateName(alternateTermNames, "tissue", "Brain");
      expect(result).toBeUndefined();
    });

    it("returns undefined when term not found in facet", () => {
      const alternateTermNames: AlternateTermNamesMap = {
        species: {
          "Homo sapiens": "Human",
        },
      };

      const result = getAlternateName(
        alternateTermNames,
        "species",
        "Rattus norvegicus"
      );
      expect(result).toBeUndefined();
    });

    it("returns undefined when map is null", () => {
      const result = getAlternateName(null, "species", TEST_SPECIES);
      expect(result).toBeUndefined();
    });

    it("returns undefined when map is undefined", () => {
      const result = getAlternateName(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Testing undefined case
        undefined as any,
        "species",
        TEST_SPECIES
      );
      expect(result).toBeUndefined();
    });
  });

  describe("AlternateTermNamesProvider", () => {
    it("loads alternate term names from API on mount", async () => {
      const mockData: AlternateTermNamesMap = {
        species: {
          "Homo sapiens": "Human",
        },
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        json: async (): Promise<AlternateTermNamesMap> => mockData,
        ok: true,
      });

      const wrapper = ({
        children,
      }: {
        children: React.ReactNode;
      }): JSX.Element => (
        <AlternateTermNamesProvider>{children}</AlternateTermNamesProvider>
      );

      const { result } = renderHook(() => useAlternateTermNames(), { wrapper });

      // Initially null
      expect(result.current.alternateTermNames).toBeNull();

      // Wait for fetch to complete
      await waitFor(() => {
        expect(result.current.alternateTermNames).toEqual(mockData);
      });

      expect(global.fetch).toHaveBeenCalledWith(ALTERNATE_TERM_NAMES_URL);
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    it("falls back to empty map when file is not found", async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 404,
      });

      const wrapper = ({
        children,
      }: {
        children: React.ReactNode;
      }): JSX.Element => (
        <AlternateTermNamesProvider>{children}</AlternateTermNamesProvider>
      );

      const { result } = renderHook(() => useAlternateTermNames(), { wrapper });

      await waitFor(() => {
        expect(result.current.alternateTermNames).toEqual({});
      });

      expect(global.fetch).toHaveBeenCalledWith(ALTERNATE_TERM_NAMES_URL);
    });

    it("falls back to empty map on fetch error", async () => {
      (global.fetch as jest.Mock).mockRejectedValueOnce(
        new Error("Network error")
      );

      const wrapper = ({
        children,
      }: {
        children: React.ReactNode;
      }): JSX.Element => (
        <AlternateTermNamesProvider>{children}</AlternateTermNamesProvider>
      );

      const { result } = renderHook(() => useAlternateTermNames(), { wrapper });

      await waitFor(() => {
        expect(result.current.alternateTermNames).toEqual({});
      });
    });

    it("falls back to empty map on JSON parse error", async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        json: async (): Promise<never> => {
          throw new Error("Invalid JSON");
        },
        ok: true,
      });

      const wrapper = ({
        children,
      }: {
        children: React.ReactNode;
      }): JSX.Element => (
        <AlternateTermNamesProvider>{children}</AlternateTermNamesProvider>
      );

      const { result } = renderHook(() => useAlternateTermNames(), { wrapper });

      await waitFor(() => {
        expect(result.current.alternateTermNames).toEqual({});
      });
    });
  });
});
