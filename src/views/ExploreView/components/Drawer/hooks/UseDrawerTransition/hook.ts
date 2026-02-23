import { DrawerProps } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useBreakpoint } from "../../../../../../hooks/useBreakpoint";
import { useDrawer } from "../../../../../../components/common/Drawer/provider/hook";
import { PHASE, Phase } from "./types";
import {
  getVariant,
  handleEnter,
  handleEntered,
  handleExit,
  handleExited,
} from "./utils";

/**
 * Manages drawer transitions between temporary and persistent variants.
 * @returns Drawer transition callbacks (onEnter, onEntered, onExit, onExited) and the variant.
 */
export function useDrawerTransition(): Pick<
  DrawerProps,
  "slotProps" | "variant"
> {
  const { mdDown: isTemporary } = useBreakpoint();
  const drawer = useDrawer();

  // Phase state to manage drawer behavior
  const [phase, setPhase] = useState<Phase>(() => PHASE.TEMPORARY_CLOSED);

  // onEnter: TEMPORARY_CLOSED → TEMPORARY_OPENING (user-initiated open)
  const onEnter = useCallback(() => setPhase(handleEnter), []);

  // onEntered: OPENING → OPEN
  const onEntered = useCallback(() => setPhase(handleEntered), []);

  // onExit: TEMPORARY_OPEN → TEMPORARY_CLOSING (user-initiated close)
  const onExit = useCallback(() => setPhase(handleExit), []);

  // onExited: Handle transition after drawer finishes closing
  const onExited = useCallback(
    () => setPhase(handleExited(isTemporary, drawer)),
    [drawer, isTemporary],
  );

  useEffect(() => {
    switch (phase) {
      case PHASE.PERSISTENT_OPEN:
        if (isTemporary) {
          setPhase(PHASE.PERSISTENT_CLOSING);
          drawer.onClose();
        }
        break;
      case PHASE.TEMPORARY_CLOSED:
        if (!isTemporary) {
          setPhase(PHASE.PERSISTENT_OPENING);
          drawer.onOpen();
        }
        break;
      case PHASE.TEMPORARY_OPEN:
        if (!isTemporary) {
          setPhase(PHASE.TEMPORARY_CLOSING);
          drawer.onClose();
        }
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only run on changes to temporary mode.
  }, [isTemporary]);

  return {
    slotProps: { transition: { onEnter, onEntered, onExit, onExited } },
    variant: getVariant(phase),
  };
}
