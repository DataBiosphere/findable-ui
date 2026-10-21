import { jest } from "@jest/globals";
import {
  getExpireTimeInDays,
  getExpiryMessage,
} from "../src/components/Export/components/ExportToTerra/components/TerraSetUpForm/components/NIHAccountExpiryWarning/utils";

const HOUR_MS = 60 * 60 * 1000;
const DAY_MS = 24 * HOUR_MS;
const NOW = new Date("2026-01-01T00:00:00.000Z").getTime();

/**
 * Returns an ISO 8601 timestamp offset from the frozen current time.
 * @param offsetMs - Offset from the frozen current time, in milliseconds.
 * @returns ISO 8601 timestamp.
 */
function timestampFromNow(offsetMs: number): string {
  return new Date(NOW + offsetMs).toISOString();
}

describe("NIHAccountExpiryWarning utils", () => {
  beforeEach(() => {
    jest.useFakeTimers().setSystemTime(NOW);
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe("getExpireTimeInDays", () => {
    it("returns 0 when the expiration timestamp is undefined", () => {
      expect(getExpireTimeInDays(undefined)).toBe(0);
    });

    it("rounds a partial day up to 1", () => {
      expect(getExpireTimeInDays(timestampFromNow(12 * HOUR_MS))).toBe(1);
    });

    it("rounds just over one day up to 2", () => {
      expect(getExpireTimeInDays(timestampFromNow(DAY_MS + 1))).toBe(2);
    });

    it("returns 0 when the expiration timestamp is in the past", () => {
      expect(getExpireTimeInDays(timestampFromNow(-DAY_MS))).toBe(0);
    });
  });

  describe("getExpiryMessage", () => {
    it("returns the expired message when the link has expired", () => {
      expect(getExpiryMessage(true, timestampFromNow(-DAY_MS))).toBe(
        "Your NIH Researcher Auth Service (RAS) account link has expired.",
      );
    });

    it("uses the singular 'day' when the link expires in under a day", () => {
      expect(getExpiryMessage(false, timestampFromNow(12 * HOUR_MS))).toBe(
        "Your NIH Researcher Auth Service (RAS) account link will expire in 1 day.",
      );
    });

    it("uses the singular 'day' when the link expires in exactly one day", () => {
      expect(getExpiryMessage(false, timestampFromNow(DAY_MS))).toBe(
        "Your NIH Researcher Auth Service (RAS) account link will expire in 1 day.",
      );
    });

    it("uses the plural 'days' when the link expires in more than one day", () => {
      expect(getExpiryMessage(false, timestampFromNow(3 * DAY_MS))).toBe(
        "Your NIH Researcher Auth Service (RAS) account link will expire in 3 days.",
      );
    });
  });
});
