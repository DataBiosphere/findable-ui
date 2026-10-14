import { CloseRounded } from "@mui/icons-material";
import {
  Dispatch,
  JSX,
  MouseEvent,
  ReactNode,
  SetStateAction,
  useState,
} from "react";
import { FeedbackIcon } from "../../../../../common/CustomIcon/components/FeedbackIcon/feedbackIcon";
import { ARIA_LABEL } from "./constants";
import { Fab, Popover } from "./dialog.styles";

/**
 * Props for the FormDialog component.
 */
export interface FormDialogProps {
  children: ReactNode;
  setFormSubmitted: Dispatch<SetStateAction<boolean>>;
}

/**
 * Floating button that opens the support request form in a popover.
 * @param props - Component props.
 * @param props.children - Popover content.
 * @param props.setFormSubmitted - Sets whether the form was submitted; reset to false when the popover closes.
 * @returns The button and popover.
 */
export const FormDialog = ({
  children,
  setFormSubmitted,
}: FormDialogProps): JSX.Element => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);

  const toggleOpen = (event: MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl((open) => (open ? null : event.currentTarget));
  };

  const onClose = (): void => {
    setAnchorEl(null);
  };

  return (
    <>
      <Fab
        aria-label={ARIA_LABEL.CONTACT_US}
        color="primary"
        onClick={toggleOpen}
        open={open}
        size="medium"
      >
        {open ? <CloseRounded /> : <FeedbackIcon fontSize="medium" />}
      </Fab>
      <Popover
        anchorEl={anchorEl}
        anchorOrigin={{
          horizontal: "right",
          vertical: -8,
        }}
        onClose={onClose}
        open={open}
        onTransitionExited={(): void => setFormSubmitted(false)}
        slotProps={{ paper: { elevation: 2 } }}
        transformOrigin={{
          horizontal: "right",
          vertical: "bottom",
        }}
      >
        {children}
      </Popover>
    </>
  );
};
