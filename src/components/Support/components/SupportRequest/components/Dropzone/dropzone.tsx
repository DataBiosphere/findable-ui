import { Box } from "@mui/material";
import { JSX } from "react";
import {
  DropzoneProps as ReactDropzoneProps,
  useDropzone,
} from "react-dropzone";

export interface DropzoneProps extends ReactDropzoneProps {
  activeStyle?: React.CSSProperties;
}

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
