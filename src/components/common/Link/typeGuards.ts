import { ANCHOR_TARGET, REL_ATTRIBUTE } from "../../Links/common/entities";

/**
 * Asserts that the given value is a valid REL_ATTRIBUTE.
 * @param value - Value to assert.
 * @throws Error if the value is not a valid REL_ATTRIBUTE.
 */
export function assertAnchorRelAttribute(
  value: string,
): asserts value is REL_ATTRIBUTE {
  if (!Object.values(REL_ATTRIBUTE).includes(value as REL_ATTRIBUTE)) {
    throw new Error(
      `Expecting rel attribute: ${value} to be one of ${Object.values(
        REL_ATTRIBUTE,
      )}`,
    );
  }
}

/**
 * Asserts that the given value is a valid ANCHOR_TARGET.
 * @param value - Value to assert.
 * @throws Error if the value is not a valid ANCHOR_TARGET.
 */
export function assertAnchorTargetAttribute(
  value: string,
): asserts value is ANCHOR_TARGET {
  if (!Object.values(ANCHOR_TARGET).includes(value as ANCHOR_TARGET)) {
    throw new Error(
      `Expecting anchor target: ${value} to be one of ${Object.values(
        ANCHOR_TARGET,
      )}`,
    );
  }
}
