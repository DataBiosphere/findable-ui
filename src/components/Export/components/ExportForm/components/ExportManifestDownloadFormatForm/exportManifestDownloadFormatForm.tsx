import { FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
import React from "react";
import { useFileManifestState } from "../../../../../../hooks/useFileManifestState";
import { FileManifestActionKind } from "../../../../../../providers/fileManifestState";
import { RadioCheckedIcon } from "../../../../../common/CustomIcon/components/RadioCheckedIcon/radioCheckedIcon";
import { RadioUncheckedIcon } from "../../../../../common/CustomIcon/components/RadioUncheckedIcon/radioUncheckedIcon";
import { ManifestDownloadFormat } from "../../../../common/entities";
import { FormControl } from "../../exportForm.styles";

export interface ExportManifestDownloadFormatFormProps {
  manifestDownloadFormat?: ManifestDownloadFormat;
  manifestDownloadFormats: ManifestDownloadFormat[];
}

export const ExportManifestDownloadFormatForm = ({
  manifestDownloadFormat,
  manifestDownloadFormats,
}: ExportManifestDownloadFormatFormProps): JSX.Element => {
  const { fileManifestDispatch } = useFileManifestState();

  // Updates file manifest format state.
  const onUpdateManifestFormat = (format: ManifestDownloadFormat): void => {
    fileManifestDispatch({
      payload: format,
      type: FileManifestActionKind.UpdateFileManifestFormat,
    });
  };

  return (
    <FormControl>
      <FormLabel>Download Format</FormLabel>
      <RadioGroup value={manifestDownloadFormat ?? ""}>
        {manifestDownloadFormats.map((manifestFormat) => (
          <FormControlLabel
            control={
              <Radio
                checkedIcon={<RadioCheckedIcon />}
                icon={<RadioUncheckedIcon />}
                onChange={(): void => onUpdateManifestFormat(manifestFormat)}
                size="small"
                value={manifestFormat}
              />
            }
            key={manifestFormat}
            label={manifestFormat}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};
