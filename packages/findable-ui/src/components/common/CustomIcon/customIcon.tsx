import { SvgIcon, SvgIconProps } from "@mui/material";
import React from "react";
import { IconName, IconSvgPathShapes } from "./common/iconSvgPathShapes";

export interface CustomIconProps extends SvgIconProps {
  iconName: IconName;
}

export const CustomIcon = ({
  iconName,
  ...props /* Spread props to allow for Mui SvgIconProps specific prop overrides e.g. "htmlColor". */
}: CustomIconProps): JSX.Element => {
  const pathShapes = IconSvgPathShapes[iconName];
  return (
    <SvgIcon {...props}>
      {pathShapes.map((shape, s) => (
        <path key={`${iconName}${s}`} d={shape} />
      ))}
    </SvgIcon>
  );
};
