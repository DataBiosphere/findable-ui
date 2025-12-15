import { ADORNMENT_TYPE } from "./constants";

export interface EndAdornmentProps {
  adornmentType: (typeof ADORNMENT_TYPE)[keyof typeof ADORNMENT_TYPE];
}
