import { FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
import { JSX, Dispatch, SetStateAction } from "react";
import { RadioCheckedIcon } from "../../../../../common/CustomIcon/components/RadioCheckedIcon/radioCheckedIcon";
import { RadioUncheckedIcon } from "../../../../../common/CustomIcon/components/RadioUncheckedIcon/radioUncheckedIcon";
import {
  BULK_DOWNLOAD_EXECUTION_ENVIRONMENT,
  ExecutionEnvironment,
} from "../../../../common/entities";
import { FormControl } from "../../exportForm.styles";

export interface ExportExecutionEnvironmentFormProps {
  executionEnvironment: ExecutionEnvironment;
  setExecutionEnvironment: Dispatch<SetStateAction<ExecutionEnvironment>>;
}

export const ExportExecutionEnvironmentForm = ({
  executionEnvironment,
  setExecutionEnvironment,
}: ExportExecutionEnvironmentFormProps): JSX.Element => {
  return (
    <FormControl>
      <FormLabel>Shell</FormLabel>
      <RadioGroup value={executionEnvironment}>
        <FormControlLabel
          control={
            <Radio
              checkedIcon={<RadioCheckedIcon />}
              icon={<RadioUncheckedIcon />}
              onChange={(): void =>
                setExecutionEnvironment(
                  BULK_DOWNLOAD_EXECUTION_ENVIRONMENT.BASH,
                )
              }
              size="small"
              value={BULK_DOWNLOAD_EXECUTION_ENVIRONMENT.BASH}
            />
          }
          label="Bash"
        />
        <FormControlLabel
          control={
            <Radio
              checkedIcon={<RadioCheckedIcon />}
              icon={<RadioUncheckedIcon />}
              onChange={(): void =>
                setExecutionEnvironment(
                  BULK_DOWNLOAD_EXECUTION_ENVIRONMENT.CMD_EXE,
                )
              }
              size="small"
              value={BULK_DOWNLOAD_EXECUTION_ENVIRONMENT.CMD_EXE}
            />
          }
          label={BULK_DOWNLOAD_EXECUTION_ENVIRONMENT.CMD_EXE}
        />
      </RadioGroup>
    </FormControl>
  );
};
