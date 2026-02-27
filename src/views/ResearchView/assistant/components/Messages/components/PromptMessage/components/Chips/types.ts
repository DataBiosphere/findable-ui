import { BaseComponentProps } from "../../../../../../../../../components/types";
import { PromptMessage } from "../../../../../../../state/types";

export interface ChipsProps extends BaseComponentProps {
  message: PromptMessage;
}
