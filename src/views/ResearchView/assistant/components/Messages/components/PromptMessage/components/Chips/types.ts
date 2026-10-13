import { BaseComponentProps } from "../../../../../../../../../components/types";
import { PromptMessage } from "../../../../../../../state/types";

/**
 * Props for the Chips component.
 */
export interface ChipsProps extends BaseComponentProps {
  message: PromptMessage;
}
