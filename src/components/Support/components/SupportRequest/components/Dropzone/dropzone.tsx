import { Box } from "@mui/material";
import { JSX } from "react";
import {
  DropzoneProps as ReactDropzoneProps,
  useDropzone,
} from "react-dropzone";

/**
 * Props for the Dropzone component.
 */
export interface DropzoneProps extends ReactDropzoneProps {
  activeStyle?: React.CSSProperties;
}

/**
 * Area that accepts dropped files. By default, the file dialog doesn't open on
 * click or keypress; children open it with `open` from the dropzone state.
 * @param props - Component props; other props are passed to react-dropzone.
 * @param props.activeStyle - Style applied while a file is dragged over.
 * @param props.children - Renders the content from the dropzone state.
 * @param props.disabled - Whether dropping is disabled. Defaults to false.
 * @returns The dropzone.
 */
export const Dropzone = ({
  activeStyle = {},
  children,
  disabled = false,
  ...props
}: DropzoneProps): JSX.Element => {
  const state = useDropzone({
    disabled,
    // Disable native files selection dialog - we'll handle this manually
    noClick: true,
    // Disable space/enter to open native files selection dialog
    noKeyboard: true,
    ...props,
  });
  const { getInputProps, getRootProps } = state;

  return (
    <Box
      component="div"
      {...getRootProps()}
      sx={state.isDragActive ? activeStyle : {}}
    >
      <input {...getInputProps()} />
      {children ? children(state) : null}
    </Box>
  );
};

export default Dropzone;
