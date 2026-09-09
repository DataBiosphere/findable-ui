export interface ClearInputAdornmentProps {
  in?: boolean;
  label?: string; // Accessible name for the clear button. Override for something more specific e.g. "Clear search"; a missing or blank value falls back to ARIA_LABEL.CLEAR.
  onClick: () => void;
}
