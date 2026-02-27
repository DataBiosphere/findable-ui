import { UseQuery } from "../../../query/types";
import { ChildrenProps } from "../../../../../components/types";
import { ChatState } from "../../../state/types";

export type FormProps = ChildrenProps &
  Pick<UseQuery, "actions"> &
  Pick<ChatState, "status">;
