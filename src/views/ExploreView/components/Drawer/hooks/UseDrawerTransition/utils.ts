import { DrawerContextProps } from "../../../../../../components/common/Drawer/provider/types";
import { PHASE, Phase, VARIANT, Variant } from "./types";

/**
 * Derives the drawer variant from the current phase.
 * @param phase - The current phase.
 * @returns The variant for the drawer.
 */
export function getVariant(phase: Phase): Variant {
  switch (phase) {
    case PHASE.PERSISTENT_CLOSING:
    case PHASE.PERSISTENT_OPEN:
    case PHASE.PERSISTENT_OPENING:
      return VARIANT.PERSISTENT;
    case PHASE.TEMPORARY_CLOSED:
    case PHASE.TEMPORARY_CLOSING:
    case PHASE.TEMPORARY_OPEN:
    case PHASE.TEMPORARY_OPENING:
      return VARIANT.TEMPORARY;
  }
}

/**
 * Handles the transition when drawer starts opening.
 * @param currentPhase - The current phase.
 * @returns The next phase.
 */
export function handleEnter(currentPhase: Phase): Phase {
  if (currentPhase === PHASE.TEMPORARY_CLOSED) {
    return PHASE.TEMPORARY_OPENING;
  }
  return currentPhase;
}

/**
 * Handles the transition after drawer finishes opening.
 * @param currentPhase - The current phase.
 * @returns The next phase.
 */
export function handleEntered(currentPhase: Phase): Phase {
  switch (currentPhase) {
    case PHASE.PERSISTENT_OPENING:
      return PHASE.PERSISTENT_OPEN;
    case PHASE.TEMPORARY_OPENING:
      return PHASE.TEMPORARY_OPEN;
    default:
      return currentPhase;
  }
}

/**
 * Handles the transition when drawer starts closing.
 * @param currentPhase - The current phase.
 * @returns The next phase.
 */
export function handleExit(currentPhase: Phase): Phase {
  if (currentPhase === PHASE.TEMPORARY_OPEN) {
    return PHASE.TEMPORARY_CLOSING;
  }
  return currentPhase;
}

/**
 * Creates a handler for when drawer finishes closing.
 * @param isTemporary - Whether to use temporary variant.
 * @param drawer - Drawer controls.
 * @returns A function that computes the next phase.
 */
export function handleExited(
  isTemporary: boolean,
  drawer: DrawerContextProps,
): (currentPhase: Phase) => Phase {
  return (currentPhase: Phase): Phase => {
    // Only handle closing phases
    if (
      currentPhase !== PHASE.PERSISTENT_CLOSING &&
      currentPhase !== PHASE.TEMPORARY_CLOSING
    ) {
      return currentPhase;
    }

    // Determine next phase if in temporary mode
    if (isTemporary) {
      return PHASE.TEMPORARY_CLOSED;
    }

    // Transitioning to persistent - trigger open
    drawer.onOpen();
    return PHASE.PERSISTENT_OPENING;
  };
}
