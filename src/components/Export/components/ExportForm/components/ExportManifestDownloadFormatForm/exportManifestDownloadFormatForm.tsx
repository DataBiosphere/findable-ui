import { FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
import { JSX } from "react";
import { FileManifestFormatState } from "../../../../../../hooks/useFileManifest/useFileManifestFormat";
import { RadioCheckedIcon } from "../../../../../common/CustomIcon/components/RadioCheckedIcon/radioCheckedIcon";
import { RadioUncheckedIcon } from "../../../../../common/CustomIcon/components/RadioUncheckedIcon/radioUncheckedIcon";
import { ManifestDownloadFormat } from "../../../../common/entities";
import { FormControl } from "../../exportForm.styles";

/**
 * Props for the ExportManifestDownloadFormatForm component.
 */
export interface ExportManifestDownloadFormatFormProps {
  fileManifestFormatState: FileManifestFormatState;
  manifestDownloadFormats: ManifestDownloadFormat[];
}

/**
 * Manifest download format choice for the export form.
 * @param props - Component props.
 * @param props.fileManifestFormatState - Selected format and its setter.
 * @param props.manifestDownloadFormats - Formats to choose from.
 * @returns The download format radio group.
 */
export const ExportManifestDownloadFormatForm = ({
  fileManifestFormatState,
  manifestDownloadFormats,
}: ExportManifestDownloadFormatFormProps): JSX.Element => {
  return (
    <FormControl>
      <FormLabel>Download Format</FormLabel>
      <RadioGroup value={fileManifestFormatState.fileManifestFormat ?? ""}>
        {manifestDownloadFormats.map((manifestFormat) => (
          <FormControlLabel
            control={
              <Radio
                checkedIcon={<RadioCheckedIcon />}
                icon={<RadioUncheckedIcon />}
                onChange={(): void =>
                  fileManifestFormatState.setFileManifestFormat(manifestFormat)
                }
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
