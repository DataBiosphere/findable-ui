import { CloseRounded } from "@mui/icons-material";
import {
  JSX,
  Dispatch,
  MouseEvent,
  ReactNode,
  SetStateAction,
  useState,
} from "react";
import { FeedbackIcon } from "../../../../../common/CustomIcon/components/FeedbackIcon/feedbackIcon";
import { Fab, Popover } from "./dialog.styles";

export interface FormDialogProps {
  children: ReactNode;
  setFormSubmitted: Dispatch<SetStateAction<boolean>>;
}

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
      <Fab color="primary" onClick={toggleOpen} open={open} size="medium">
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
