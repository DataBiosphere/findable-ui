import { UseQuery } from "../../../query/types";
import {
  BaseComponentProps,
  ChildrenProps,
} from "../../../../../components/types";
import { ChatState } from "../../../state/types";

export type FormProps = BaseComponentProps &
  ChildrenProps &
  Pick<UseQuery, "actions"> &
  Pick<ChatState, "status">;
